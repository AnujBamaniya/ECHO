const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  type: { type: String, enum: ['medical', 'evac', 'safe'], required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  details: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);