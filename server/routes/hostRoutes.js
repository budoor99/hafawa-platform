const express = require("express");
const router = express.Router();
const { applyAsHost, upgradeToHost } = require("../controllers/hostController");

router.post("/apply", applyAsHost);
router.post("/upgrade", upgradeToHost);

module.exports = router;
