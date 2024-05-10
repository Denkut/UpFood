const express = require("express");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const {
  getRations,
  getRation,
  addRation,
  editRation,
  deleteRation,
} = require("../controllers/ration");
const mapRation = require("../helper/mapRation");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { rations, lastPage } = await getRations(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, rations: rations.map(mapRation) } });
});

router.get("/:id", async (req, res) => {
  const ration = await getRation(req.params.id);

  res.send({ data: mapRation(ration) });
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newRation = await addRation({
      title: req.body.title,
      image: req.body.imageUrl,
      goal: req.body.goal,
      meals: req.body.meals,
      totalCalories: req.body.totalCalories,
      totalPrices: req.body.totalPrices,
      content: req.body.content,
    });

    res.send({ data: mapRation(newRation) });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedRation = await editRation(req.params.id, {
      title: req.body.title,
      image: req.body.imageUrl,
      goal: req.body.goal,
      meals: req.body.meals,
      totalCalories: req.body.totalCalories,
      totalPrices: req.body.totalPrices,
      content: req.body.content,
    });

    res.send({ data: mapRation(updatedRation) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteRation(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
