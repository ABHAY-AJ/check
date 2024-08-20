// hrController.js
const Job = require('../models/Job');
const Internship = require('../models/Internship');
const Candidate = require('../models/Candidate');
const Application = require("../models/Application")

exports.addJob = async (req, res) => {
  try {
    const { title, description, location,criteria } = req.body;

    const job = new Job({
      title,
      description,
      location,
      criteria,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json({ msg: 'Job added successfully', job });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Read Jobs (Accessible by all authorized users)
exports.getJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json({ jobs });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Update Job (HR Only)
  exports.updateJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      if (job.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to update this job' });
      }
  
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({ msg: 'Job updated successfully', updatedJob });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Delete Job (HR Only)
  exports.deleteJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
  
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      if (job.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to delete this job' });
      }
  
      await job.deleteOne(job);
      res.status(200).json({ msg: 'Job deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


exports.addInternship = async (req, res) => {
  try {
    const { title, description,location, criteria } = req.body;

    const internship = new Internship({
      title,
      description,
      location,
      criteria,
      postedBy: req.user.id,
    });

    await internship.save();
    res.status(201).json({ msg: 'Internship added successfully', internship });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Read Internships (Accessible by all authorized users)
exports.getInternships = async (req, res) => {
    try {
      const internships = await Internship.find();
      res.status(200).json({ internships });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Update Internship (HR Only)
  exports.updateInternship = async (req, res) => {
    try {
      const internship = await Internship.findById(req.params.id);
  
      if (!internship) {
        return res.status(404).json({ msg: 'Internship not found' });
      }
  
      if (internship.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to update this internship' });
      }
  
      const updatedInternship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({ msg: 'Internship updated successfully', updatedInternship });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Delete Internship (HR Only)
  exports.deleteInternship = async (req, res) => {
    try {
      const internship = await Internship.findById(req.params.id);
  
      if (!internship) {
        return res.status(404).json({ msg: 'Internship not found' });
      }
  
      if (internship.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to delete this internship' });
      }
  
      await internship.deleteOne(internship);
      res.status(200).json({ msg: 'Internship deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


// searchJobs controller
exports.searchJobs = async (req, res) => {
  try {
    const { title, location, skills, experience, status, college } = req.query;

    // Build query object
    const query = {};

    if (title) query.title = new RegExp(title, 'i'); // Case-insensitive search
    if (location) query.location = new RegExp(location, 'i'); // Case-insensitive search
    if (skills) query['criteria.skills'] = { $in: skills.split(',') }; // Split comma-separated skills
    if (experience) query['criteria.experience'] = new RegExp(experience, 'i'); // Case-insensitive search
    if (status) query.status = status; // Filter by status
    if (college) query.college = college; // Filter by college

    // Find jobs based on query
    const jobs = await Job.find(query)
                          .populate('postedBy', 'name') // Populate postedBy field with user name
                          .populate('college', 'name'); // Populate college field with college name

    res.status(200).json({ jobs });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.searchCandidates = async (req, res) => {
  try {
    const { jobId, internshipId, skills, experience, location, status } = req.query;

    const query = {};

    // Filter by Job or Internship
    if (jobId) {
      query.jobId = jobId;
    } else if (internshipId) {
      query.internshipId = internshipId;
    }

    // Filter by Application Status
    if (status) {
      query.status = status;
    }

    // Find applications based on the query
    const applications = await Application.find(query)
      .populate('studentId')
      .populate('jobId internshipId');

    // Filter by Skills, Experience, Location
    const filteredCandidates = applications.filter(application => {
      const student = application.studentId;
      let matches = true;

      if (skills) {
        const skillsArray = skills.split(',');
        matches = skillsArray.every(skill => student.skills.includes(skill));
      }

      if (experience && student.experience !== experience) {
        matches = false;
      }

      if (location && student.location !== location) {
        matches = false;
      }

      return matches;
    });

    res.status(200).json({ candidates: filteredCandidates });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Predict Candidate Fit
exports.predictCandidateFit = async (req, res) => {
  try {
    const { jobId, candidateId } = req.params;

    const job = await Job.findById(jobId);
    const candidate = await Candidate.findById(candidateId);

    if (!job || !candidate) {
      return res.status(404).json({ msg: 'Job or Candidate not found' });
    }

    // Log retrieved data for debugging
    console.log("Job Data:", job);
    console.log("Candidate Data:", candidate);

    // Ensure job.skills is an array and handle job criteria
    const jobSkills = job.criteria?.skills || [];
    const jobExperience = Number(job.criteria?.experience) || 0; // Convert to number

    // Ensure candidate.skills is an array
    const candidateSkills = candidate.skills || [];
    const candidateExperience = candidate.experience || 0;

    // Initialize score
    let score = 0;

    // Skills Matching (e.g., +10 points per matching skill)
    const matchingSkills = candidateSkills.filter(skill => jobSkills.includes(skill));
    score += matchingSkills.length * 10;

    // Experience Matching (e.g., +20 points for exact match, +/- points for range)
    const experienceDifference = Math.abs(jobExperience - candidateExperience);
    if (experienceDifference === 0) {
      score += 20; // Exact match
    } else if (experienceDifference <= 2) {
      score += 10; // Close match
    }

    // Predict Join Probability (e.g., 70+ score is considered likely to join)
    const likelyToJoin = score >= 70;

    res.status(200).json({
      jobId: job._id,
      candidateId: candidate._id,
      score,
      likelyToJoin,
      matchingSkills,
      experienceDifference,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





// // Filter and Search Candidates
// exports.searchCandidates = async (req, res) => {
//   try {
//     const { location, skills, experienceMin, experienceMax, dateOfBirth } = req.query;

//     // Build query object
//     const query = {};
//     if (location) query.location = location;
//     if (skills) query.skills = { $in: skills.split(',') }; // Split comma-separated skills
//     if (experienceMin || experienceMax) {
//       query.experience = {};
//       if (experienceMin) query.experience.$gte = experienceMin;
//       if (experienceMax) query.experience.$lte = experienceMax;
//     }
//     if (dateOfBirth) query.dateOfBirth = { $gte: new Date(dateOfBirth) };

//     const candidates = await Candidate.find(query);
//     res.status(200).json({ candidates });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };




// exports.filterCandidates = async (req, res) => {
//   try {
//     const filters = req.body; // Example: { area: "Engineering", skills: ["React", "Node.js"] }
//     const candidates = await Candidate.find(filters);

//     res.status(200).json({ candidates });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// More HR-specific controllers, e.g., for job profile matching, setting criteria, etc.
