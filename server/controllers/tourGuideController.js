const createUser = require("../utils/createUser");
const TourGuideProfile = require("../models/TourGuideProfile");
const User = require("../models/User");

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
      languages,
      city,
      calendarUrl,
      specialRequests,
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
