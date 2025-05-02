const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Host = require("./models/Host"); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/applyhost', async (req, res) => {
    const { fullName, username, email, password, phoneNumber, city } = req.body;

    if (!fullName || !username || !email || !password || !phoneNumber || !city) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newHost = new Host({
            fullName,
            username,
            email,
            password, 
            phoneNumber,
            city,
        });

        await newHost.save();

        res.status(201).json({ message: "Details submitted successfully!" });
    } catch (error) {
        console.error("Error saving host:", error);
        res.status(500).json({ message: "An error occurred while saving your details." });
    }
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5050;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
};

startServer();

