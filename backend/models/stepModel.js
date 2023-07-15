const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  key: String,
  x: Number,
  y: Number,
  elements: Object
});

module.exports = mongoose.model('Step', stepSchema);