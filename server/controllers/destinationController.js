const Destination = require("../models/Destination");
const User = require("../models/User");

// get all destinations

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};

// get a single destination by ID

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ error: "Destination not found" });
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch destination" });
  }
};

// Create (Add) a new destination

exports.postDestenation = async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      fullDescription,
      imageSrc,
      directionsUrl,
      websiteUrl,
    } = req.body;

    if (!name || !shortDescription || !fullDescription || !imageSrc) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDestination = new Destination({
      name,
      shortDescription,
      fullDescription,
      imageSrc: imageSrc.trim(), // just in case
      directionsUrl,
      websiteUrl,
    });

    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    console.error("Error adding destination:", err);
    res.status(500).json({ message: "Server error while adding destination" });
  }
};

exports.deleteDestination = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDestination = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await Destination.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ error: "Server error while updating destination" });
  }
};
