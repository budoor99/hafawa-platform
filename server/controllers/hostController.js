const createUser = require("../utils/createUser");
const HostProfile = require("../models/HostProfile");
const User = require("../models/User");
const mongoose = require("mongoose");


const User = require("../models/User");
const Host = require("../models/HostProfile");

// Apply as a host (creates a user and marks them as host)
exports.applyAsHost = async (req, res) => {
  try {
    const { fullName, username, email, password, phoneNumber, city } = req.body;

    // 1. Create the User
    const newUser = new User({
      fullName,
      username,
      email,
      password,
      phoneNumber,
      city,
      role: "host", // set role
      status: "pending",
    });

    const savedUser = await newUser.save();

    // 2. Create the Host profile
    const hostProfile = new Host({
      user: savedUser._id,
      city,
      aboutMe: "",
      languages: [],
      specialRequests: [],
      experienceYears: 0,
      calendarUrl: "",
      placePhotos: [],

    });

    await hostProfile.save();

    res.status(201).json({

      message: "Host application submitted successfully",
      user: savedUser,
      hostProfile,
    });
  } catch (error) {
    console.error("Error saving host application:", error);
    res.status(500).json({ message: "Error applying as host", error: error.message });
  }
};

// Create host profile by user ID (optional)
exports.createHost = async (req, res) => {
  const { userId } = req.params;
  const { city } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProfile = await Host.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Host profile already exists for this user" });
    }

    const newHost = new Host({
      user: userId,
      city,
      aboutMe: "",
      languages: [],
      specialRequests: [],
      experienceYears: 0,
      calendarUrl: "",
      placePhotos: [],
    });

    const savedHost = await newHost.save();
    user.role = "host";
    await user.save();

    res.status(201).json({ message: "Host profile created", host: savedHost });
  } catch (error) {
    console.error("Error creating host profile:", error.message);
    res.status(500).json({ message: "Error creating host profile", error: error.message });
  }
};

// ✅ List all hosts (used in /hosts)
exports.listAllHosts = async (req, res) => {
  try {
    const hosts = await Host.find().populate("user");
    res.status(200).json(hosts);
  } catch (error) {
    console.error("Error fetching hosts:", error.message);
    res.status(500).json({ message: "Error fetching hosts", error: error.message });
  }
};

// ✅ Get a single host profile by ID (used in /hosts/view/:id)
exports.getHostById = async (req, res) => {
  const { hostId } = req.params;

  try {
    const host = await Host.findById(hostId).populate("user");

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }

    res.status(200).json(host);
  } catch (error) {
    console.error("Error fetching host profile:", error.message);
    res.status(500).json({ message: "Error fetching host profile", error: error.message });
  }
};

// (Optional) Update or delete host
exports.updateHostProfile = async (req, res) => {
  const { hostId } = req.params;
  const updateData = req.body;

  try {
    const host = await Host.findByIdAndUpdate(hostId, updateData, { new: true }).populate("user");
    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }
    res.status(200).json({ message: "Host updated", host });
  } catch (error) {
    console.error("Error updating host:", error.message);
    res.status(500).json({ message: "Error updating host", error: error.message });
  }
};

exports.deleteHostProfile = async (req, res) => {
  const { hostId } = req.params;

  try {
    const deleted = await Host.findByIdAndDelete(hostId);
    if (!deleted) {
      return res.status(404).json({ message: "Host not found" });
    }
    res.status(200).json({ message: "Host profile deleted" });
  } catch (error) {
    console.error("Error deleting host:", error.message);
    res.status(500).json({ message: "Error deleting host", error: error.message });

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

exports.updateHost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
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
      calendarUrl,
    } = req.body;

    const user = await User.findById(id).session(session);
    if (!user || user.role !== "host") {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Host not found" });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.isVerified = isVerified;
    await user.save({ session });

    const profile = await HostProfile.findOne({ user: id }).session(session);
    if (!profile) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Host profile not found" });
    }

    profile.city = city;
    profile.aboutMe = aboutMe;
    profile.languages = languages;
    profile.experienceYears = experienceYears;
    profile.specialRequests = specialRequests;
    profile.calendarUrl = calendarUrl;
    if (req.body.placePhotos !== undefined) {
      profile.placePhotos = req.body.placePhotos;
    }

    await profile.save({ session });

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Host updated successfully", user, profile });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Update host failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Activate Host
exports.activateHost = async (req, res) => {
  try {
    const hostId = req.params.id;
    const user = await User.findById(hostId);
    if (!user || user.role !== "host") {
      return res.status(404).json({ message: "Host not found" });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Host activated" });
  } catch (err) {
    console.error("Activation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Deactivate Host
exports.deactivateHost = async (req, res) => {
  console.log("heree");
  try {
    const hostId = req.params.id;
    const user = await User.findById(hostId);
    if (!user || user.role !== "host") {
      return res.status(404).json({ message: "Host not found" });
    }

    user.isVerified = false;
    await user.save();
    res.status(200).json({ message: "Host deactivated" });
  } catch (err) {
    console.error("Deactivation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
