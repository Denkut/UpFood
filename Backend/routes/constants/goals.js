const express = require("express");
const router = express.Router();
const Goal = require("../../models/constants/Goal");

router.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    console.error("Error fetching meal goals:", error);
    res.status(500).json({ message: "Failed to fetch meal goals" });
  }
});

router.get("/goals/:id", async (req, res) => {
  try {
    const goalId = parseInt(req.params.id);
    const goalsData = await Goal.find();
    const goal = goalsData[0].goal.find((t) => t.id === goalId);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error);
    res.status(500).json({ message: "Failed to fetch goal" });
  }
});

module.exports = router;
