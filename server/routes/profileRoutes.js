const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { requireAuth } = require("../middlewares/authMiddleware");

// Get user profile
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate("bookmarks")
      .exec();
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

// Route to get all bookmarks
router.get("/bookmarks", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("bookmarks");
    res.status(200).json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

// Route to bookmark a destination
router.post("/bookmarks/:id", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.bookmarks.push(req.params.id);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to bookmark destination" });
  }
});

// Route to unbookmark a destination
router.delete("/bookmarks/:id", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.bookmarks = user.bookmarks.filter(
      (id) => id.toString() !== req.params.id
    );
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Failed to unbookmark destination" });
  }
});

module.exports = router;
