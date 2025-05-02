const User = require("../models/User");
// const Destination = require("../models/Destination");
const TourGuideProfile = require("../models/TourGuideProfile");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRegularUsers = await User.countDocuments({ role: "user" });

    const activeTourGuides = await User.countDocuments({
      role: "tourguide",
      isVerified: true,
    });
    const inactiveTourGuides = await User.countDocuments({
      role: "tourguide",
      isVerified: false,
    });

    const activeHosts = await User.countDocuments({
      role: "host",
      isVerified: true,
    });
    const inactiveHosts = await User.countDocuments({
      role: "host",
      isVerified: false,
    });
    const totalHosts = await User.countDocuments({
      role: "host",
    });
    const totalTourGuides = await User.countDocuments({
      role: "tourguide",
    });

    // const totalDestinations = await Destination.countDocuments();

    res.status(200).json({
      totalUsers,
      totalRegularUsers,
      totalTourGuides,
      activeTourGuides,
      inactiveTourGuides,
      totalHosts,
      activeHosts,
      inactiveHosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

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
