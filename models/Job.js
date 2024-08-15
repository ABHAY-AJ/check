const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  companyName: String,
  location: String,
  jobType: String, // e.g., Full-time, Part-time
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  salaryRange: String,
  postedAt: { type: Date, default: Date.now },
  deadline: Date,
});

module.exports = mongoose.model('Job', JobSchema);
