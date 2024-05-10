const express = require("express");
const router = express.Router();
const Ingredient = require("../../models/constants/Ingredient");

router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching meal ingredients:", error);
    res.status(500).json({ message: "Failed to fetch meal ingredients" });
  }
});

router.get("/ingredients/:id", async (req, res) => {
  try {
    const ingredientId = parseInt(req.params.id);
    const ingredientsData = await Ingredient.find();
    const ingredient = ingredientsData[0].ingredient.find(
      (t) => t.id === ingredientId
    );
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.json(ingredient);
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    res.status(500).json({ message: "Failed to fetch ingredient" });
  }
});

module.exports = router;
