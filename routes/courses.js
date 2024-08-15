const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get course by ID
router.get('/:id', courseController.getCourseById);

// Create course
router.post('/', authMiddleware, courseController.createCourse);

// Update course
router.put('/:id', authMiddleware, courseController.updateCourse);

// Delete course
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;
