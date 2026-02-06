const prisma = require('../config/database');

// Get All Mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await prisma.mentor.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        company: true,
        expertise: true,
        experience: true,
        rating: true,
        reviews: true,
        sessions: true,
        price: true,
        location: true,
        languages: true,
        available: true,
        nextSlot: true,
        responseTime: true,
        image: true,
        color: true,
        bio: true,
        achievements: true,
        specialties: true,
        isPremium: true
      }
    });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
};

// Get Mentor Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const { mentorId } = req.params;
    
    const mentor = await prisma.mentor.findUnique({
      where: { id: mentorId },
      include: {
        bookings: {
          include: { user: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    
    const stats = {
      totalSessions: mentor.sessions,
      upcomingSessions: mentor.bookings.filter(b => 
        b.status === 'CONFIRMED' && new Date(b.date) > new Date()
      ).length,
      completedSessions: mentor.bookings.filter(b => b.status === 'COMPLETED').length,
      totalEarnings: mentor.bookings
        .filter(b => b.status === 'COMPLETED')
        .reduce((sum, b) => sum + b.amount, 0)
    };
    
    res.json({ mentor, stats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mentor dashboard' });
  }
};
