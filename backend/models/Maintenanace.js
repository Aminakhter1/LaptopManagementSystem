const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  laptopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop'},
  description: { type: String, required: true },
  status: { type: String, enum: ['in progress', 'completed']},
  cost: { type: Number },
  loggedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
