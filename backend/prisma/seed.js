const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ 
  host: 'localhost',
  port: 5432,
  database: 'pathfinder_ai',
  user: 'postgres',
  password: 'password',
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample mentors
  const mentors = [
    {
      email: 'sarah.chen@google.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Sarah Chen',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'Node.js', 'System Design'],
      experience: '8 years',
      rating: 4.9,
      reviews: 127,
      sessions: 245,
      price: 2500,
      location: 'Bangalore',
      languages: ['English', 'Hindi'],
      available: true,
      nextSlot: 'Today, 3:00 PM',
      responseTime: '< 2 hours',
      color: 'blue',
      bio: 'Passionate about mentoring aspiring developers',
      achievements: ['Google Cloud Certified', 'Published Author'],
      specialties: ['Web Development', 'Cloud Architecture'],
      isPremium: true
    },
    {
      email: 'raj.kumar@microsoft.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Raj Kumar',
      title: 'Principal Engineer',
      company: 'Microsoft',
      expertise: ['Python', 'Machine Learning', 'AI'],
      experience: '10 years',
      rating: 4.8,
      reviews: 98,
      sessions: 189,
      price: 3000,
      location: 'Hyderabad',
      languages: ['English', 'Hindi', 'Telugu'],
      available: true,
      nextSlot: 'Tomorrow, 10:00 AM',
      responseTime: '< 1 hour',
      color: 'purple',
      bio: 'AI/ML expert with industry experience',
      achievements: ['Microsoft MVP', 'AI Research Papers'],
      specialties: ['Machine Learning', 'Data Science'],
      isPremium: true
    },
    {
      email: 'priya.sharma@amazon.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Priya Sharma',
      title: 'Tech Lead',
      company: 'Amazon',
      expertise: ['Java', 'AWS', 'Microservices'],
      experience: '7 years',
      rating: 4.7,
      reviews: 85,
      sessions: 156,
      price: 2000,
      location: 'Mumbai',
      languages: ['English', 'Hindi'],
      available: true,
      nextSlot: 'Today, 5:00 PM',
      responseTime: '< 3 hours',
      color: 'orange',
      bio: 'Backend specialist and cloud architect',
      achievements: ['AWS Certified Solutions Architect'],
      specialties: ['Backend Development', 'Cloud Computing'],
      isPremium: false
    },
    {
      email: 'amit.patel@meta.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Amit Patel',
      title: 'Frontend Architect',
      company: 'Meta',
      expertise: ['React', 'TypeScript', 'UI/UX'],
      experience: '6 years',
      rating: 4.9,
      reviews: 112,
      sessions: 203,
      price: 2200,
      location: 'Pune',
      languages: ['English', 'Hindi', 'Gujarati'],
      available: true,
      nextSlot: 'Tomorrow, 2:00 PM',
      responseTime: '< 2 hours',
      color: 'green',
      bio: 'Frontend expert with design thinking',
      achievements: ['React Conf Speaker'],
      specialties: ['Frontend Development', 'UI/UX Design'],
      isPremium: true
    }
  ];

  for (const mentor of mentors) {
    await prisma.mentor.upsert({
      where: { email: mentor.email },
      update: {},
      create: mentor
    });
  }

  console.log('✅ Mentors created');

  // Create sample courses
  const courses = [
    {
      title: 'Full Stack Web Development',
      description: 'Master React, Node.js, and MongoDB to build modern web applications',
      category: 'Web Development',
      duration: '12 weeks',
      level: 'Intermediate',
      instructor: 'Sarah Chen',
      rating: 4.8,
      students: 1250,
      price: 4999
    },
    {
      title: 'Machine Learning Fundamentals',
      description: 'Learn ML algorithms, Python, and build real-world AI projects',
      category: 'Data Science',
      duration: '10 weeks',
      level: 'Beginner',
      instructor: 'Raj Kumar',
      rating: 4.9,
      students: 980,
      price: 5999
    },
    {
      title: 'AWS Cloud Architecture',
      description: 'Design and deploy scalable cloud solutions on AWS',
      category: 'Cloud Computing',
      duration: '8 weeks',
      level: 'Advanced',
      instructor: 'Priya Sharma',
      rating: 4.7,
      students: 756,
      price: 6999
    },
    {
      title: 'React & TypeScript Mastery',
      description: 'Build type-safe React applications with modern best practices',
      category: 'Frontend',
      duration: '6 weeks',
      level: 'Intermediate',
      instructor: 'Amit Patel',
      rating: 4.9,
      students: 1450,
      price: 3999
    },
    {
      title: 'Data Structures & Algorithms',
      description: 'Master DSA for coding interviews at top tech companies',
      category: 'Programming',
      duration: '14 weeks',
      level: 'Intermediate',
      instructor: 'Sarah Chen',
      rating: 4.8,
      students: 2100,
      price: 4499
    },
    {
      title: 'UI/UX Design Bootcamp',
      description: 'Learn design thinking, Figma, and create stunning interfaces',
      category: 'Design',
      duration: '8 weeks',
      level: 'Beginner',
      instructor: 'Amit Patel',
      rating: 4.7,
      students: 890,
      price: 3499
    }
  ];

  for (const course of courses) {
    await prisma.course.create({ data: course });
  }

  console.log('✅ Courses created');

  // Create sample hackathons
  const hackathons = [
    {
      title: 'Smart India Hackathon 2024',
      description: 'National level hackathon to solve real-world problems',
      organizer: 'Government of India',
      startDate: new Date('2024-08-15'),
      endDate: new Date('2024-08-17'),
      prize: '₹1,00,000',
      difficulty: 'Advanced',
      participants: 5000,
      tags: ['AI', 'IoT', 'Blockchain'],
      registrationLink: 'https://sih.gov.in'
    },
    {
      title: 'Google Solution Challenge',
      description: 'Build solutions for UN Sustainable Development Goals',
      organizer: 'Google',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-09-03'),
      prize: '$5,000',
      difficulty: 'Intermediate',
      participants: 3500,
      tags: ['Web', 'Mobile', 'Cloud'],
      registrationLink: 'https://developers.google.com'
    },
    {
      title: 'Microsoft Imagine Cup',
      description: 'Global student technology competition',
      organizer: 'Microsoft',
      startDate: new Date('2024-10-10'),
      endDate: new Date('2024-10-12'),
      prize: '$10,000',
      difficulty: 'Advanced',
      participants: 4200,
      tags: ['AI', 'Azure', 'Innovation'],
      registrationLink: 'https://imaginecup.microsoft.com'
    },
    {
      title: 'HackWithInfy',
      description: 'Infosys coding challenge for engineering students',
      organizer: 'Infosys',
      startDate: new Date('2024-07-20'),
      endDate: new Date('2024-07-21'),
      prize: '₹2,00,000',
      difficulty: 'Intermediate',
      participants: 8000,
      tags: ['Coding', 'Problem Solving'],
      registrationLink: 'https://www.infosys.com'
    }
  ];

  for (const hackathon of hackathons) {
    await prisma.hackathon.create({ data: hackathon });
  }

  console.log('✅ Hackathons created');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
