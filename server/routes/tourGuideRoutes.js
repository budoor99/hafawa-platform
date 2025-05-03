const express = require("express");
const router = express.Router();
const { applyAsTourGuide, getTourGuideProfile, getVerifiedTourGuides } = require("../controllers/tourGuideController");

router.post("/apply", applyAsTourGuide);
router.get("/:id", getTourGuideProfile);
router.get("/", getVerifiedTourGuides);

module.exports = router;
