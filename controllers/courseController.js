const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create course
exports.createCourse = async (req, res) => {
  const { title, description, duration, price } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      duration,
      price,
      instructor: req.user.id,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  const { title, description, duration, price } = req.body;

  try {
    let course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Check user
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, duration, price } },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ msg: 'Course not found' });

    // Check user
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
