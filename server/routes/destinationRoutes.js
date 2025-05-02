const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');



// Route to get all destinations
router.get('/', destinationController.getAllDestinations);

// Route to get one destination by ID
router.get('/:id', destinationController.getDestinationById);

module.exports = router;
