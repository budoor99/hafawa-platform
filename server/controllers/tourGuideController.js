const bcrypt = require("bcryptjs");
const createUser = require("../utils/createUser");
const TourGuideProfile = require("../models/TourGuideProfile");
const User = require("../models/User");
const mongoose = require("mongoose");


exports.applyAsTourGuide = async (req, res) => {
  try {
    const { name, email, phone, password, aboutMe, city, experienceYears, languages, calendarUrl, specialRequests } = req.body;

    const userId = await createUser({
      name,
      email,
      phone,
      password,
      role: "tourguide",
      isVerified: false,
    });

    const profile = new TourGuideProfile({
      userId,
      aboutMe,
      city,
      experienceYears,
      activities
      
    });

    await profile.save();

    res.status(201).json({ message: "Tour guide application submitted.", userId, profileId: profile._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

<<<<<<< HEAD
exports.getVerifiedTourGuides = async (req, res) => {
  try {
    const users = await User.find({ role: "tourguide", isVerified: true });

    const guidesWithCity = await Promise.all(
      users.map(async (user) => {
        const profile = await TourGuideProfile.findOne({ userId: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          city: profile?.city || "Unknown",
        };
      })
    );

    res.status(200).json(guidesWithCity);
  } catch (err) {
    console.error("Error fetching verified guides:", err);
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

// Get all tour guides
exports.getAllTourGuides = async (req, res) => {
  try {
    const users = await User.find({ role: "tourguide" })
      .sort({ createdAt: -1 })
      .lean();

    const profiles = await TourGuideProfile.find().lean();

    const merged = users.map((user) => {
      const profile = profiles.find(
        (p) => p.userId.toString() === user._id.toString()
      );

      return {
        ...user,
        city: profile?.city || "",
        aboutMe: profile?.aboutMe || "",
        languages: profile?.languages || [],
        experienceYears: profile?.experienceYears || 0,
        specialRequests: profile?.specialRequests || [],
        calendarUrl: profile?.calendarUrl || "",
        activities: profile?.activities || [],
      };
    });

    res.status(200).json(merged);
  } catch (err) {
    console.error("Error fetching tour guides:", err);
    res.status(500).json({ message: "Server error" });
  }
};

<<<<<<< HEAD
exports.getTourGuideProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const profile = await TourGuideProfile.findOne({ userId }).populate("userId").populate("activities");;

    if (!profile) {
      return res.status(404).json({ message: "Tour guide profile not found" });
    }

    res.status(200).json({
      user: {
        name: profile.userId.name,
        email: profile.userId.email,
      },
      city: profile.city,
      aboutMe: profile.aboutMe,
      experienceYears: profile.experienceYears,
      languages: profile.languages,
      calendarUrl: profile.calendarUrl,
      specialRequests: profile.specialRequests,
      activities:profile.activities
      
    });
  } catch (err) {
    console.error("Error fetching tour guide profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};






=======
// Deactivate a tour guide
exports.deactivateTourGuide = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "tourguide") {
      return res.status(404).json({ message: "Tour guide not found" });
    }

    user.isVerified = false;
    await user.save();

    res.status(200).json({ message: "Tour guide deactivated", user });
  } catch (err) {
    console.error("Deactivate error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Activate a tour guide
exports.activateTourGuide = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "tourguide") {
      return res.status(404).json({ message: "Tour guide not found" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Tour guide activated", user });
  } catch (err) {
    console.error("Activate error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTourGuide = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const id = req.params.id;
    const {
      name,
      email,
      phone,
      isVerified,
      city,
      aboutMe,
      languages,
      experienceYears,
      specialRequests,
    } = req.body;

    console.log("heree", id);

    const user = await User.findById(id).session(session);
    if (!user || user.role !== "tourguide") {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Tour guide not found" });
    }

    // Update User
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.isVerified = isVerified;
    await user.save({ session });

    // Update Tour Guide Profile
    const profile = await TourGuideProfile.findOne({ userId: id }).session(
      session
    );
    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Tour guide profile not found" });
    }

    profile.city = city;
    profile.aboutMe = aboutMe;
    profile.languages = languages;
    profile.experienceYears = experienceYears;
    profile.specialRequests = specialRequests;

    if (req.body.activities !== undefined) {
      profile.activities = req.body.activities;
    }
    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Tour guide updated", user, profile });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
>>>>>>> d06bb8f9861d28357f3d2357cb581c6c15b7c331
