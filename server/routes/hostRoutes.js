const express = require("express");
const router = express.Router();
const {
  applyAsHost,
  createHost,
  listAllHosts,
  getHostById,
  updateHostProfile,
  deleteHostProfile,
  upgradeToHost,
} = require("../controllers/hostController");

// Apply as a host
router.post("/apply", applyAsHost);
router.post("/upgrade", upgradeToHost);

// Create a host profile by user ID
router.post("/create/:userId", createHost);

// List all hosts
router.get("/", listAllHosts);

// Get a host profile by ID
router.get("/view/:hostId", getHostById);

module.exports = router;
