const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/auth');

router.get('/dashboard/:userId', authenticateToken, studentController.getDashboard);
router.get('/activities/:userId', authenticateToken, studentController.getActivities);

module.exports = router;
