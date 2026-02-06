const prisma = require('../config/database');

// Get Student Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        courses: {
          include: { course: true }
        },
        careerGoals: true,
        activities: {
          orderBy: { timestamp: 'desc' },
          take: 10
        },
        bookings: {
          include: { mentor: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const stats = {
      coursesCompleted: user.courses.filter(c => c.completed).length,
      careerGoals: user.careerGoals.length,
      skillProgress: user.courses.length > 0 
        ? Math.round(user.courses.reduce((acc, c) => acc + c.progress, 0) / user.courses.length)
        : 0,
      mentorSessions: user.bookings.filter(b => b.status === 'COMPLETED').length
    };
    
    res.json({ user, stats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Enroll in Course
exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    const enrollment = await prisma.courseEnrollment.create({
      data: { userId, courseId },
      include: { course: true }
    });
    
    await prisma.activity.create({
      data: {
        userId,
        type: 'course_enrollment',
        title: 'Enrolled in Course',
        description: `Enrolled in ${enrollment.course.title}`
      }
    });
    
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

// Update Course Progress
exports.updateProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { progress, completed } = req.body;
    
    const enrollment = await prisma.courseEnrollment.update({
      where: { id: enrollmentId },
      data: { progress, completed },
      include: { course: true, user: true }
    });
    
    if (completed) {
      await prisma.activity.create({
        data: {
          userId: enrollment.userId,
          type: 'course_completion',
          title: 'Completed Course',
          description: `Completed ${enrollment.course.title}`
        }
      });
    }
    
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

// Get User Activities
exports.getActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await prisma.activity.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 20
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};
