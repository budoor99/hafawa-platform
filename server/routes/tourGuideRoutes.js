const express = require("express");
const router = express.Router();
const { applyAsTourGuide } = require("../controllers/tourGuideController");

router.post("/apply", applyAsTourGuide);

module.exports = router;
