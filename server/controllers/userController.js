const User = require("../models/User");
const TourGuideProfile = require("../models/TourGuideProfile");
const HostProfile = require("../models/HostProfile");
const mongoose = require("mongoose");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 }); // latest
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deactivated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isVerified: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User activated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, isVerified } = req.body;
    const userId = req.params.id;

    const updated = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, isVerified },
      { new: true } // return updated user
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.params;
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    // Delete related profile if needed
    if (user.role === "host") {
      await HostProfile.findOneAndDelete({ user: userId }).session(session);
    } else if (user.role === "tourguide") {
      await TourGuideProfile.findOneAndDelete({ userId }).session(session);
    }

    await User.findByIdAndDelete(userId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "User and profile deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
