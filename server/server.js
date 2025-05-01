const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// load environment variables
dotenv.config();

// create app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const tourGuideRoutes = require("./routes/tourGuideRoutes");
const hostRoutes = require("./routes/hostRoutes");

app.use("/api/tour-guides", tourGuideRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hosts", hostRoutes);

// connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
