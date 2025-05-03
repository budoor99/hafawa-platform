const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const {
  getUsers,
  deactivateUser,
  activateUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { sendEmailToUser } = require("../controllers/sendEmailController");
const {
  getAllTourGuides,
  deactivateTourGuide,
  activateTourGuide,
  applyAsTourGuide,
  updateTourGuide,
} = require("../controllers/tourGuideController");

const {
  getAllHosts,
  updateHost,
  activateHost,
  deactivateHost,
} = require("../controllers/hostController");

// Dashboard
router.get("/dashboard", getDashboardStats);

// Users
router.get("/users", getUsers);
router.patch("/users/:id/deactivate", deactivateUser);
router.patch("/users/:userId/activate", activateUser);
router.put("/users/:id", updateUser);
router.delete("/users/delete/:userId", deleteUser); //for All

// Tour Guides
router.get("/tour-guides", getAllTourGuides);
router.patch("/tour-guides/:id/deactivate", deactivateTourGuide);
router.patch("/tour-guides/:id/activate", activateTourGuide);
router.post("/tour-guides/apply", applyAsTourGuide); // to add new tour guide
router.put("/tour-guides/:id", updateTourGuide);

// Hosts
router.get("/hosts", getAllHosts);
router.put("/hosts/:id", updateHost);
router.patch("/hosts/:id/activate", activateHost);
router.patch("/hosts/:id/deactivate", deactivateHost);

router.post("/send-email", sendEmailToUser);

module.exports = router;
