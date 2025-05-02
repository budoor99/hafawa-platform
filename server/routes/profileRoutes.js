const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { requireAuth } = require("../middlewares/authMiddleware");

// Get user profile
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put("/", requireAuth, async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;

    // Find and update the user
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
        email,
        phone,
        location,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
