const mongoose = require("mongoose")
const tourGuideProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  aboutMe: { type: String },
  languages: [String],
  city: { type: String, required: true },
  calendarUrl: { type: String },
  experienceYears: { type: Number },
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Destination" }],
  specialRequests: [String],
  
});

module.exports = mongoose.model("TourGuideProfile", tourGuideProfileSchema);
