const createUser = require("../utils/createUser");
const HostProfile = require("../models/HostProfile");

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
