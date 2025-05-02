const Destination = require('../models/Destination');

// Get all destinations

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};

// Get a single destination by ID

exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
};
