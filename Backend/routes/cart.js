const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  addToCart,
  removeFromCart,
  getCart,
  updateQuantity,
} = require("../controllers/cart");
const mapCart = require("../helper/mapCart");

const router = express.Router({ mergeParams: true });

router.post("/:id", authenticated, async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      const userId = req.params.id;
      const { meals, rations } = req.body;

      const products = [];

      if (meals && meals.length > 0) {
        meals.forEach((meal) => {
          products.push({
            productId: meal.id,
            productType: "meal",
            quantity: meal.quantity,
          });
        });
      }

      if (rations && rations.length > 0) {
        rations.forEach((ration) => {
          products.push({
            productId: ration.id,
            productType: "ration",
            quantity: ration.quantity,
          });
        });
      }

      const updatedCart = await addToCart(userId, products);

      res.status(200).send({ data: mapCart(updatedCart) });
    } else {
      res.status(403).send({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", authenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await getCart(id);
    res.send({ data: mapCart(cart) });
  } catch (error) {
    res.status(500).send({ error: "Failed to get user's cart" });
  }
});
router.patch("/:userId/:itemId", authenticated, async (req, res) => {
  const { userId, itemId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await updateQuantity(userId, itemId, quantity);
    res.status(200).json({ data: mapCart(updatedItem) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:id/:itemId", authenticated, async (req, res) => {
  const { id, itemId } = req.params;

  try {
    removeFromCart(id, itemId);
    res.send({ error: null });
  } catch (error) {
    res.status(500).send({ error: "Failed to remove product from cart" });
  }
});

module.exports = router;
