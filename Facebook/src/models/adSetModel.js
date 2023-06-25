const mongoose = require('mongoose');

const adSetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  targeting: { type: String, required: true },
});

module.exports = mongoose.model('AdSet', adSetSchema);
