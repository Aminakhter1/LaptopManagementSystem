const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  password: String,
  role: { type: String, enum: ['Admin', 'Employee'], default: 'Employee' },
});

module.exports = mongoose.model('Employee', employeeSchema);
