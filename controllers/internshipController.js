const Internship = require('../models/Internship');

// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate('postedBy', 'name');
    res.json(internships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate('postedBy', 'name');
    if (!internship) return res.status(404).json({ msg: 'Internship not found' });
    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create internship
exports.createInternship = async (req, res) => {
  const { title, description, companyName, location, internshipType, stipend, duration, deadline } = req.body;

  try {
    const newInternship = new Internship({
      title,
      description,
      companyName,
      location,
      internshipType,
      postedBy: req.user.id,
      stipend,
      duration,
      deadline,
    });

    const internship = await newInternship.save();
    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  const { title, description, companyName, location, internshipType, stipend, duration, deadline } = req.body;

  try {
    let internship = await Internship.findById(req.params.id);

    if (!internship) return res.status(404).json({ msg: 'Internship not found' });

    // Check user
    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, companyName, location, internshipType, stipend, duration, deadline } },
      { new: true }
    );

    res.json(internship);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    let internship = await Internship.findById(req.params.id);

    if (!internship) return res.status(404).json({ msg: 'Internship not found' });

    // Check user
    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Internship.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Internship removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
