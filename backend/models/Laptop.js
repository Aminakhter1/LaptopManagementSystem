const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'assigned', 'maintenance'], required: true },
  purchaseDate: { type: Date},
});

module.exports = mongoose.model('Laptop', laptopSchema);
