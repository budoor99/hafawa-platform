const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "host", "tourguide", "admin"],
    default: "user",
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

  bookmarkedDestinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }] //a user can have many destinations bookmarked

});

module.exports = mongoose.model("User", userSchema);
