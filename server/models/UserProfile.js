const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
      default: "", // optional
    },
    location: {
      type: String, // "Riyadh"
      default: "",
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
