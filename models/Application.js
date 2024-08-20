const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: function() {
      return !this.internshipId && !this.eventId;
    }
  },
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: function() {
      return !this.jobId && !this.eventId;
    }
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: function() {
      return !this.jobId && !this.internshipId;
    }
  },
  status: {
    type: String,
    enum: ['Applied', 'Reviewed', 'Interviewed', 'Offered', 'Rejected'],
    default: 'Applied'
  },
  dateApplied: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
