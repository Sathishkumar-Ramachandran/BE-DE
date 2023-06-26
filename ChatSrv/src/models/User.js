const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatarUrl: { type: String },
  group: { type: String },
  designation: { type: String },
});

module.exports = mongoose.model('User', userSchema);
