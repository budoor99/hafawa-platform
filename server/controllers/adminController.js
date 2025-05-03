const User = require("../models/User");
// const Destination = require("../models/Destination");
const TourGuideProfile = require("../models/TourGuideProfile");
const HostProfile = require("../models/HostProfile");
const mongoose = require("mongoose");

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
