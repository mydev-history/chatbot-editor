const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({  
  kind: String,  
  description: String,
  image: String
});

module.exports = mongoose.model('Animal', animalSchema);