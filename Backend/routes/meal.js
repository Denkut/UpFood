const express = require("express");
const {
  getMeals,
  addMeal,
  getMeal,
  editMeal,
  deleteMeal,
} = require("../controllers/meal");
const mapMeal = require("../helper/mapMeal");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { meals, lastPage } = await getMeals(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, meals: meals.map(mapMeal) } });
});

router.get("/:id", async (req, res) => {
  const meal = await getMeal(req.params.id);

  res.send({ data: mapMeal(meal) });
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newMeal = await addMeal({
      title: req.body.title,
      image: req.body.imageUrl,
      quantity: req.body.quantity,
      type: req.body.type,
      calories: req.body.calories,
      goal: req.body.goal,
      diet: req.body.diet,
      ingredients: req.body.ingredients,
      price: req.body.price,
    });
    res.send({ data: mapMeal(newMeal) });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedMeal = await editMeal(req.params.id, {
      title: req.body.title,
      image: req.body.imageUrl,
      quantity: req.body.quantity,
      type: req.body.type,
      calories: req.body.calories,
      goal: req.body.goal,
      diet: req.body.diet,
      ingredients: req.body.ingredients,
      price: req.body.price,
    });

    res.send({ data: mapMeal(updatedMeal) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteMeal(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
