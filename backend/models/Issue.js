const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  laptopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop'},
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high']},
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  reportedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Issue', issueSchema);
