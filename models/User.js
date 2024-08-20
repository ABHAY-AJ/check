const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['TPO', 'HR', 'Student', 'Company', 'College'], required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  profile: {
    dob: Date,
    skills: [String],
    experience: String,
    projects: [String],
  },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  appliedInternships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Internship' }],
  appliedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
})



// Hashing password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Compare password method
  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

module.exports = mongoose.model("User",userSchema);