const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  languages: [String], // ["Arabic", "English", "French"]
  aboutMe: {
    type: String,
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  specialRequests: [String], // ["No smoking", "No pets"]
  calendarUrl: {
    type: String, // google calendar embed link
  },
  placePhotos: [
    {
      url: String, // URL to uploaded image
      caption: String, // Optional image caption
    },
  ],
});

module.exports = mongoose.model("Host", hostSchema);
