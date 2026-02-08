const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const courseRoutes = require('./routes/courseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const otherRoutes = require('./routes/otherRoutes');
const forumRoutes = require('./routes/forumRoutes');
const studyGroupRoutes = require('./routes/studyGroupRoutes');
const successStoryRoutes = require('./routes/successStoryRoutes');
const referralRoutes = require('./routes/referralRoutes');
const prisma = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'PathFinder AI API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      students: '/api/student',
      mentors: '/api/mentors',
      courses: '/api/courses',
      bookings: '/api/bookings',
      forum: '/api/forum',
      studyGroups: '/api/study-groups',
      successStories: '/api/success-stories',
      referrals: '/api/referrals'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/study-groups', studyGroupRoutes);
app.use('/api/success-stories', successStoryRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api', otherRoutes);

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: '/api/health'
  });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully');
    console.log('📦 Database: pathfinder_ai');
    console.log('🔗 Ready to accept requests!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 Check your .env file and PostgreSQL connection');
  }
});
