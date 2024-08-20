
const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });
  
  module.exports = mongoose.model('College', collegeSchema);
  