const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  try {
    const { content, name, email, sender, phone } = req.body;

    const message = new Message({
      content,
      name,
      email,
      phone,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;