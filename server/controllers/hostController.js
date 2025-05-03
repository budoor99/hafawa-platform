const createUser = require("../utils/createUser");
const HostProfile = require("../models/HostProfile");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.applyAsHost = async (req, res) => {
  try {
    const { name, email, phone, password, city, aboutMe, experienceYears } =
      req.body;

    // create user (role: host, unverified)
    const userId = await createUser({
      name,
      email,
      phone,
      password,
      role: "host",
      isVerified: false,
    });

    // create host profile linked to user
    const hostProfile = new HostProfile({
      user: userId,
      city,
      aboutMe,
      experienceYears,
    });

    await hostProfile.save();

    res.status(201).json({
      message: "Host application submitted.",
      userId,
      profileId: hostProfile._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.upgradeToHost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      userId,
      city,
      languages,
      aboutMe,
      experienceYears,
      specialRequests,
      calendarUrl,
      placePhotos,
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

    user.role = "host";
    await user.save({ session });

    const hostProfile = new HostProfile({
      user: userId,
      city,
      languages,
      aboutMe,
      experienceYears,
      specialRequests,
      calendarUrl,
      placePhotos,
    });

    await hostProfile.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "User upgraded to host successfully",
      userId: user._id,
      profileId: hostProfile._id,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Upgrade failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all Hosts
exports.getAllHosts = async (req, res) => {
  try {
    const users = await User.find({ role: "host" })
      .sort({ createdAt: -1 })
      .lean();

    const profiles = await HostProfile.find().lean();

    const merged = users.map((user) => {
      const profile = profiles.find(
        (p) => p.user.toString() === user._id.toString()
      );

      return {
        ...user,
        city: profile?.city || "",
        aboutMe: profile?.aboutMe || "",
        languages: profile?.languages || [],
        experienceYears: profile?.experienceYears || 0,
        specialRequests: profile?.specialRequests || [],
        calendarUrl: profile?.calendarUrl || "",
        activities: profile?.placePhotos || [],
      };
    });

    res.status(200).json(merged);
  } catch (err) {
    console.error("Error fetching Hosts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
