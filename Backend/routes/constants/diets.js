const express = require("express");
const Diet = require("../../models/constants/Diet");
const router = express.Router();

router.get("/diets", async (req, res) => {
  try {
    const diets = await Diet.find();
    res.json(diets);
  } catch (error) {
    console.error("Error fetching meal diets:", error);
    res.status(500).json({ message: "Failed to fetch meal diets" });
  }
});

router.get("/diets/:id", async (req, res) => {
  try {
    const dietId = parseInt(req.params.id);
    const dietsData = await Diet.find();
    const diet = dietsData[0].diet.find((t) => t.id === dietId);
    if (!diet) {
      return res.status(404).json({ message: "Diet not found" });
    }
    res.json(diet);
  } catch (error) {
    console.error("Error fetching diet:", error);
    res.status(500).json({ message: "Failed to fetch diet" });
  }
});

module.exports = router;
