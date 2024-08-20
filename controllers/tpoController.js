// tpoController.js
const Job = require('../models/Job');
const Event = require('../models/Event');
const Course = require("../models/Course");


// Create Course (TPO Only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    const course = new Course({
      title,
      description,
      duration,
      instructor: req.user.id,
    });

    await course.save();
    res.status(201).json({ msg: 'Course created successfully', course });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Read Courses (Accessible by all authorized users)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update Course (TPO Only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: 'Course updated successfully', updatedCourse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Course (TPO Only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this course' });
    }

    await course.deleteOne(course);
    res.status(200).json({ msg: 'Course deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





// exports.addCampusJob = async (req, res) => {
//   try {
//     const { title, description, collegeSelection } = req.body;

//     const job = new Job({
//       title,
//       description,
//       collegeSelection,
//       createdBy: req.user.id,
//     });

//     await job.save();
//     res.status(201).json({ msg: 'Campus job added successfully', job });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

exports.addEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const event = new Event({
      title,
      description,
      date,
      organizer: req.user.id,
    });

    await event.save();
    res.status(201).json({ msg: 'Event added successfully', event });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Read Events (Accessible by all authorized users)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update Event (TPO Only)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: 'Event updated successfully', updatedEvent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Event (TPO Only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this event' });
    }

    await event.deleteOne(event);
    res.status(200).json({ msg: 'Event deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};