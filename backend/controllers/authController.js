const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Student Signup
exports.studentSignup = async (req, res) => {
  try {
    const { email, password, fullName, phone, city, grade, school } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        city,
        grade,
        school,
        role: 'STUDENT'
      }
    });
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Student signup error:', error);
    res.status(500).json({ error: error.message || 'Signup failed' });
  }
};

// Student Login
exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
};

// Mentor Signup
exports.mentorSignup = async (req, res) => {
  try {
    const { email, password, name, title, company, expertise, experience, price, location, languages, bio } = req.body;
    
    const existingMentor = await prisma.mentor.findUnique({ where: { email } });
    if (existingMentor) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const mentor = await prisma.mentor.create({
      data: {
        email,
        password: hashedPassword,
        name,
        title,
        company,
        expertise: expertise || [],
        experience,
        price: parseInt(price) || 2000,
        location,
        languages: languages || ['English'],
        bio,
        achievements: [],
        specialties: []
      }
    });
    
    const token = jwt.sign({ id: mentor.id, email: mentor.email, role: 'MENTOR' }, JWT_SECRET);
    
    res.json({ 
      token, 
      mentor: { 
        id: mentor.id, 
        email: mentor.email, 
        name: mentor.name, 
        role: 'MENTOR' 
      } 
    });
  } catch (error) {
    console.error('Mentor signup error:', error);
    res.status(500).json({ error: error.message || 'Mentor signup failed' });
  }
};

// Mentor Login
exports.mentorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const mentor = await prisma.mentor.findUnique({ where: { email } });
    if (!mentor) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, mentor.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: mentor.id, email: mentor.email, role: 'MENTOR' }, JWT_SECRET);
    
    res.json({ 
      token, 
      mentor: { 
        id: mentor.id, 
        email: mentor.email, 
        name: mentor.name, 
        role: 'MENTOR' 
      } 
    });
  } catch (error) {
    console.error('Mentor login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
};
