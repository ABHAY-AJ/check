const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  companyName: String,
  location: String,
  internshipType: String, // e.g., Paid, Unpaid
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  stipend: String,
  duration: String, // e.g., 3 months
  postedAt: { type: Date, default: Date.now },
  deadline: Date,
});

module.exports = mongoose.model('Internship', InternshipSchema);
