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
