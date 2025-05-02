const bcrypt = require("bcryptjs");
const createUser = require("../utils/createUser");
const TourGuideProfile = require("../models/TourGuideProfile");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.applyAsTourGuide = async (req, res) => {
  try {
    const { name, email, phone, password, aboutMe, city, experienceYears } =
      req.body;

    const userId = await createUser({
      name,
      email,
      phone,
      password,
      role: "tourguide",
      isVerified: false,
    });

    // create profile
    const profile = new TourGuideProfile({
      userId,
      aboutMe,
      city,
      experienceYears,
    });

    await profile.save();

    res.status(201).json({
      message: "Tour guide application submitted.",
      userId,
      profileId: profile._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.upgradeToTourGuide = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      userId,
      city,
      languages,
      aboutMe,
      experienceYears,
      calendarUrl,
      activities,
      specialRequests = [],
    } = req.body;

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "user") {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "User is already a host or tour guide" });
    }

    user.role = "tourguide";
    await user.save({ session });

    const guideProfile = new TourGuideProfile({
      userId,
      city,
      languages: languages || [],
      aboutMe,
      experienceYears,
      specialRequests: specialRequests || [],
      calendarUrl,
      activities: activities || [],
    });

    await guideProfile.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "User upgraded to tour guide successfully",
      userId: user._id,
      profileId: guideProfile._id,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Tour guide upgrade failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
