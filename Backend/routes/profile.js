const express = require("express");
const mapUser = require("../helper/mapUser");
const authenticated = require("../middlewares/authenticated");
const { editUser } = require("../controllers/user");

const router = express.Router({ mergeParams: true });

router.patch("/:id", authenticated, async (req, res) => {
  if (req.user.id === req.params.id) {
    const updatedUser = await editUser(req.params.id, {
      login: req.body.login,
      fullName: req.body.fullName,
      weight: req.body.weight,
      goal: req.body.goal,
      height: req.body.height,
      age: req.body.age,
      email: req.body.email,
      diet: req.body.diet,
      allergenicIngredients: req.body.allergenicIngredients,
    });

    res.send({ error: null, data: mapUser(updatedUser) });
  } else {
    res.status(403).send({ error: "Unauthorized" });
  }
});

module.exports = router;
