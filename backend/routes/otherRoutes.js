const express = require('express');
const router = express.Router();
const otherController = require('../controllers/otherController');
const { authenticateToken } = require('../middleware/auth');

// Career Goals
router.get('/career-goals/:userId', authenticateToken, otherController.getCareerGoals);
router.post('/career-goals', authenticateToken, otherController.createCareerGoal);
router.patch('/career-goals/:id', authenticateToken, otherController.updateCareerGoal);

// Hackathons
router.get('/hackathons', otherController.getHackathons);

// Contact Form
router.post('/contact', otherController.submitContactForm);

module.exports = router;
