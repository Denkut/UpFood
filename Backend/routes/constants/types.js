const express = require("express");
const router = express.Router();
const Type = require("../../models/constants/Type");

router.get("/types", async (req, res) => {
  try {
    const types = await Type.find();
    res.json(types);
  } catch (error) {
    console.error("Error fetching meal types:", error);
    res.status(500).json({ message: "Failed to fetch meal types" });
  }
});

router.get("/types/:id", async (req, res) => {
  try {
    const typeId = parseInt(req.params.id);
    const typesData = await Type.find();
    const type = typesData[0].type.find((t) => t.id === typeId);
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }
    res.json(type);
  } catch (error) {
    console.error("Error fetching type:", error);
    res.status(500).json({ message: "Failed to fetch type" });
  }
});

module.exports = router;
