// studentController.js

const Application = require('../models/Application');
const Job = require('../models/Job');
const Internship = require('../models/Internship');
const User = require('../models/User');
const Event = require('../models/Event');
const Candidate = require('../models/Candidate');

// Apply for a Job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Check if the student has already applied for this job
    const existingApplication = await Application.findOne({
      jobId,
      studentId: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({ msg: 'You have already applied for this job' });
    }

    // Create a new application
    const application = new Application({
      jobId,
      studentId: req.user.id,
    });

    // Save the application
    await application.save();


    // Add the student to the candidates list in the job
    const job = await Job.findById(jobId);
    job.candidates.push(req.user.id);
    await job.save();

    // Add the application ID to the user's appliedJobs array
    const user = await User.findById(req.user.id);
    user.appliedJobs.push(application._id);
    await user.save();
    console.log("nnnnnnnnn", user.name);


     // Extract profile details from the user
     const { name, profile } = user;
     const { dob, skills, experience, projects } = profile;
 
     // Save candidate information
     const candidate = new Candidate({
       name,
       location: user.college ? user.college.name : 'N/A', // Assuming location might be tied to the college
       skills,
       experience,
       projects,
       dateOfBirth: dob,
     });
 
     await candidate.save();


    // // Save candidate information
    // const candidate = new Candidate({
    //   name: user.name,
    //   location: user.location,
    //   skills: user.skills,
    //   experience: user.experience,
    //   projects: user.projects,
    //   dateOfBirth: user.dateOfBirth,
    // });

    // await candidate.save();

    res.status(201).json({ msg: 'Applied for job successfully', application });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Apply for an Internship
exports.applyForInternship = async (req, res) => {
  try {
    const { internshipId } = req.body;

    // Check if the student has already applied for this internship
    const existingApplication = await Application.findOne({
      internshipId,
      studentId: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({ msg: 'You have already applied for this internship' });
    }

    // Create a new application
    const application = new Application({
      internshipId,
      studentId: req.user.id,
    });

    // Save the application
    await application.save();

    // Add the student to the candidates list in the internship
    const internship = await Internship.findById(internshipId);
    internship.candidates.push(req.user.id);
    await internship.save();

    // Add the application ID to the user's appliedInternships array
    const user = await User.findById(req.user.id);
    user.appliedInternships.push(application._id);
    await user.save();

    // Save candidate information
    const candidate = new Candidate({
      name: user.name,
      location: user.location,
      skills: user.skills,
      experience: user.experience,
      projects: user.projects,
      dateOfBirth: user.dateOfBirth,
    });

    await candidate.save();

    res.status(201).json({ msg: 'Applied for internship successfully', application });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Applied Jobs
exports.getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id }).populate('jobId');

    res.status(200).json({ applications });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Applied Internships
exports.getAppliedInternships = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id }).populate('internshipId');

    res.status(200).json({ applications });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




exports.applyForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if the student has already applied for this internship
    const existingApplication = await Application.findOne({
      eventId,
      studentId: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({ msg: 'You have already applied for this event' });
    }
    const application = new Application({
      eventId,
      studentId: req.user.id,
    });

    await application.save();


    // Add the student to the candidates list in the event
    const event = await Event.findById(eventId);
    event.participants.push(req.user.id);
    await event.save();


    // Add the application ID to the user's appliedEvents array
    const user = await User.findById(req.user.id);
    user.appliedEvents.push(application._id);
    await user.save();



    res.status(201).json({ msg: 'Applied for event successfully', application });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get Applied Events
exports.getAppliedEvents = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id }).populate('eventId');

    res.status(200).json({ applications });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


