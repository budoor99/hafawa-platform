const express = require("express");
const router = express.Router();
const {
  applyAsTourGuide,
  getTourGuideProfile,
  getVerifiedTourGuides,
  upgradeToTourGuide,
} = require("../controllers/tourGuideController");

router.post("/apply", applyAsTourGuide);
router.get("/:id", getTourGuideProfile);
router.get("/", getVerifiedTourGuides);
router.post("/upgrade", upgradeToTourGuide);

module.exports = router;
