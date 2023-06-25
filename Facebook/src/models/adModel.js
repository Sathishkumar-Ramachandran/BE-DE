const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adSetId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdSet', required: true },
  creative: { type: String, required: true },
});

module.exports = mongoose.model('Ad', adSchema);
