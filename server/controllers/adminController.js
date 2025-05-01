const User = require("../models/User");
// const Destination = require("../models/Destination");
const TourGuideProfile = require("../models/TourGuideProfile");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

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

    // const totalDestinations = await Destination.countDocuments();

    res.status(200).json({
      totalUsers,
      activeTourGuides,
      inactiveTourGuides,
      activeHosts,
      inactiveHosts,
      //   totalDestinations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
