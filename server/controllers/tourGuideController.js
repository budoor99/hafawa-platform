const bcrypt = require("bcryptjs");
const createUser = require("../utils/createUser");
const TourGuideProfile = require("../models/TourGuideProfile");

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
