const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  education: [
    {
      degree: String,
      institution: String,
      yearOfPassing: String,
    },
  ],
  experience: [
    {
      jobTitle: String,
      companyName: String,
      duration: String,
      responsibilities: String,
    },
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', ResumeSchema);
