const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', mentorController.getAllMentors);
router.get('/dashboard/:mentorId', authenticateToken, mentorController.getDashboard);

module.exports = router;
