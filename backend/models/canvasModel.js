const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
  sp_id: String,
  ep_id: String,
  s_pos: Object,
  e_pos: Object
});

module.exports = mongoose.model('Canvas', canvasSchema);

