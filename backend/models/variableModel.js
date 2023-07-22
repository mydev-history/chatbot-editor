const mongoose = require('mongoose');

const variableSchema = new mongoose.Schema({
  vname: String,
  vtype: String,
});

module.exports = mongoose.model('Variable', variableSchema);
