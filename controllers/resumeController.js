const Resume = require('../models/Resume');

// Get resume by User ID
exports.getResumeByUserId = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) return res.status(404).json({ msg: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Server error');
  }
};

// Create resume
exports.createResume = async (req, res) => {
  const { personalDetails, education, experience, skills, projects } = req.body;

  try {
    const newResume = new Resume({
      userId: req.user.id,
      personalDetails,
      education,
      experience,
      skills,
      projects,
    });

    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update resume
exports.updateResume = async (req, res) => {
  const { personalDetails, education, experience, skills, projects } = req.body;

  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ msg: 'Resume not found' });

    // Check user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: { personalDetails, education, experience, skills, projects } },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) return res.status(404).json({ msg: 'Resume not found' });

    // Check user
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Resume.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Resume removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
