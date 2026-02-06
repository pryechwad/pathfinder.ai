const prisma = require('../config/database');

// Get Career Goals
exports.getCareerGoals = async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await prisma.careerGoal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch career goals' });
  }
};

// Create Career Goal
exports.createCareerGoal = async (req, res) => {
  try {
    const { userId, title, description, targetDate } = req.body;
    
    const goal = await prisma.careerGoal.create({
      data: {
        userId,
        title,
        description,
        targetDate: targetDate ? new Date(targetDate) : null
      }
    });
    
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create career goal' });
  }
};

// Update Career Goal
exports.updateCareerGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    
    const goal = await prisma.careerGoal.update({
      where: { id },
      data: { completed }
    });
    
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update career goal' });
  }
};

// Get Hackathons
exports.getHackathons = async (req, res) => {
  try {
    const hackathons = await prisma.hackathon.findMany({
      orderBy: { startDate: 'asc' }
    });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hackathons' });
  }
};

// Contact Form Submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contact = await prisma.contact.create({
      data: { name, email, subject, message }
    });
    
    res.json({ success: true, message: 'Contact form submitted successfully', contact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};
