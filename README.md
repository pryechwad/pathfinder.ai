# PathFinder AI

An AI-powered career guidance and mentorship platform designed to help students discover their career paths, connect with industry experts, and achieve their professional goals through personalized learning and mentorship.

## Overview

PathFinder AI is a comprehensive career development platform that combines AI-driven career guidance with expert mentorship, structured learning paths, and real-world project opportunities. The platform serves students from Classes 8-12 and beyond, helping them make informed career decisions and acquire the skills needed for their dream jobs.

## Key Features

### For Students
- **AI-Powered Career Guidance**: Get personalized career recommendations based on your interests, skills, and goals
- **12-Month Odyssey Track**: Sequential monthly assessments designed for Classes 8-12 students
- **Aptitude Modules**: Scientific evaluations to unlock your comprehensive career blueprint
- **Expert Mentorship**: Connect with industry professionals from top companies like Google, Microsoft, Amazon, and Adobe
- **Course Library**: Access 500+ courses across technology, business, and creative fields
- **Real-World Projects**: Build portfolio-worthy projects that showcase your skills
- **Career Dashboard**: Track your progress, goals, and achievements in one place
- **Hackathon Opportunities**: Participate in coding competitions and challenges

### For Mentors
- **Profile Management**: Showcase your expertise, experience, and achievements
- **Session Scheduling**: Manage your availability and booking slots
- **Student Connections**: Guide students through their career journey
- **Earnings Dashboard**: Track your mentorship sessions and earnings

## Technology Stack

### Frontend
- **React 19.2.0**: Modern UI library for building interactive interfaces
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express 5.2.1**: Web application framework
- **Prisma 7.3.0**: Next-generation ORM
- **PostgreSQL**: Relational database
- **JWT**: Authentication and authorization
- **Bcrypt**: Password hashing

### Additional Tools
- **Nodemon**: Development server with auto-reload
- **ESLint**: Code linting and quality checks

## Project Structure

```
pathfinder.ai/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions and API clients
│   │   └── assets/          # Static assets
│   └── public/              # Public static files
│
├── backend/                 # Express backend application
│   ├── controllers/         # Request handlers
│   ├── routes/              # API route definitions
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── prisma/              # Database schema and migrations
│   └── utils/               # Utility functions
│
└── docs/                    # Documentation files
```

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pathfinder.ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/pathfinder"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

### 3. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with initial data (optional)
npm run db:seed
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Database Schema

### Core Models

- **User**: Student profiles with authentication
- **Mentor**: Expert mentor profiles and availability
- **Booking**: Mentorship session bookings
- **Course**: Course catalog and content
- **CourseEnrollment**: Student course progress tracking
- **CareerGoal**: Student career objectives and milestones
- **Activity**: User activity tracking
- **Hackathon**: Coding competitions and events
- **Contact**: Contact form submissions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students/dashboard` - Get student dashboard data
- `PUT /api/students/profile` - Update student profile
- `GET /api/students/courses` - Get enrolled courses
- `POST /api/students/goals` - Create career goal

### Mentors
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/:id` - Get mentor details
- `POST /api/mentors/register` - Register as mentor
- `PUT /api/mentors/profile` - Update mentor profile

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `PUT /api/bookings/:id` - Update booking status

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/enroll` - Enroll in course

### Other
- `GET /api/hackathons` - Get hackathon listings
- `POST /api/contact` - Submit contact form

## Features in Detail

### Career Command Center
Search any career role or track multi-month growth with the 12-month odyssey track. Popular career paths include:
- Civil Services
- Data Scientist
- Fashion Designer
- Lawyer
- AI Engineer
- Surgeon
- Pilot

### Monthly Assessment
A sequential 12-month growth journey designed for Classes 8-12, helping students progressively build skills and knowledge.

### Aptitude Modules
Scientific evaluations that assess:
- Logical reasoning
- Analytical skills
- Creative thinking
- Technical aptitude
- Communication abilities

### Mentor Matching
AI-powered algorithm matches students with mentors based on:
- Career interests
- Skill requirements
- Learning goals
- Availability
- Budget

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Development Tools

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React lazy loading
- Image optimization
- API response caching
- Database query optimization with Prisma
- Tailwind CSS purging for smaller bundle sizes

## Deployment

### Backend Deployment
1. Set up PostgreSQL database on your hosting provider
2. Configure environment variables
3. Run database migrations
4. Deploy Node.js application

### Frontend Deployment
1. Build the production bundle
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure environment variables
4. Set up custom domain (optional)

## Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database exists

**Port Already in Use:**
- Change PORT in backend .env file
- Kill process using the port

**Module Not Found:**
- Run `npm install` in respective directory
- Clear node_modules and reinstall

**Prisma Client Error:**
- Run `npm run db:generate`
- Restart development server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- All contributors and mentors who make this platform possible
