const express = require("express");
const router = express.Router();
const { applyAsHost } = require("../controllers/hostController");

router.post("/apply", applyAsHost);

module.exports = router;
