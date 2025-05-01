const mongoose = require("mongoose");

const tourGuideProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  aboutMe: { type: String },
  languages: [String],
  city: {
    type: String,
    required: true,
  },
  calendarUrl: { type: String }, // public google calendar embed URL
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
  ],
  specialRequests: [String], // ["No smoking", "No pets"]
  experienceYears: { type: Number }, // years of experience
});

module.exports = mongoose.model("TourGuideProfile", tourGuideProfileSchema);
