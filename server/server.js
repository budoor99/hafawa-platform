const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// load environment variables
dotenv.config();

// create app
const app = express();

// make /uploads folder publicly accessible
app.use("/uploads", express.static("uploads"));

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const tourGuideRoutes = require("./routes/tourGuideRoutes");
const hostRoutes = require("./routes/hostRoutes");
const adminRoutes = require("./routes/adminRoutes");
const destinationRoutes = require("./routes/destinationRoutes"); //Destination
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/tour-guides", tourGuideRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hosts", hostRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);

//to test only !
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    const PORT = 5050;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
