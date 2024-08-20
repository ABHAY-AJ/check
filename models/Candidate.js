// models/Candidate.js

const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  skills: {
    type: [String], // Array of skills
    required: false,
  },
  experience: {
    type: Number, // Years of experience
    required: false,
  },
  projects: {
    type: [String], // List of projects or project titles
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model('Candidate', CandidateSchema);
