const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.studentSignup);
router.post('/login', authController.studentLogin);
router.post('/mentor/signup', authController.mentorSignup);
router.post('/mentor/login', authController.mentorLogin);

module.exports = router;
