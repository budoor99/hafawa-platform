const express = require("express");
const router = express.Router();
const {
  applyAsTourGuide,
  upgradeToTourGuide,
} = require("../controllers/tourGuideController");

router.post("/apply", applyAsTourGuide);
router.post("/upgrade", upgradeToTourGuide);

module.exports = router;
