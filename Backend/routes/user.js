const express = require("express");
const {
  getUsers,
  updateUser,
  deleteUser,
  getRoles,
  getUser,
} = require("../controllers/user");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const mapUser = require("../helper/mapUser");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();
    res.send({ data: users.map(mapUser) });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/roles", authenticated, hasRole([ROLES.ADMIN]), (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

router.get("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const user = await getUser(req.params.id);

  res.send({ data: mapUser(user) });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newUser = await updateUser(req.params.id, {
      role: req.body.roleId,
    });

    res.send({ data: mapUser(newUser) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
