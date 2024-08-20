
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    criteria: {
      skills: [String],
      experience: String,
    },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  });
  
  module.exports = mongoose.model('Job', jobSchema);
  