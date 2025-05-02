const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  deactivateUser,
  activateUser,
} = require("../controllers/adminController");
const { sendEmailToUser } = require("../controllers/sendEmailController");

router.get("/dashboard", getDashboardStats);
router.get("/users", getUsers);
router.patch("/users/:id/deactivate", deactivateUser);
router.patch("/users/:userId/activate", activateUser);

router.post("/send-email", sendEmailToUser);

module.exports = router;
