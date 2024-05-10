const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/users", require("./user"));
router.use("/profile", require("./profile"));
router.use("/meals", require("./meal"));
router.use("/rations", require("./ration"));
router.use("/cart", require("./cart"));

module.exports = router;
