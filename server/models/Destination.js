const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({

  name: { type: String, required: true }, //displayed in destination page
  shortDescription: { type: String }, //displayed in destination page
  fullDescription: { type: String },
  imageSrc: { type: String },
  directionsUrl: { type: String },
  websiteUrl: { type: String }
  
});

module.exports = mongoose.model('Destination', destinationSchema);
