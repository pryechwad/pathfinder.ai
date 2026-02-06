# PathFinder AI Backend

## Setup Instructions

### 1. Install PostgreSQL
- Download and install PostgreSQL from https://www.postgresql.org/download/
- Create a database named `pathfinder_ai`
- Update the DATABASE_URL in `.env` file with your PostgreSQL credentials

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Setup Database
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 4. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Student signup
- `POST /api/auth/login` - Student login
- `POST /api/auth/mentor/signup` - Mentor signup
- `POST /api/auth/mentor/login` - Mentor login

### Student Dashboard
- `GET /api/student/dashboard/:userId` - Get student dashboard data
- `GET /api/courses` - Get all courses
- `POST /api/courses/enroll` - Enroll in a course
- `PATCH /api/courses/progress/:enrollmentId` - Update course progress

### Mentor Dashboard
- `GET /api/mentors` - Get all mentors
- `GET /api/mentor/dashboard/:mentorId` - Get mentor dashboard data

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/mentor/:mentorId` - Get mentor bookings
- `PATCH /api/bookings/:id` - Update booking status

### Career Goals
- `GET /api/career-goals/:userId` - Get career goals
- `POST /api/career-goals` - Create career goal
- `PATCH /api/career-goals/:id` - Update career goal

### Hackathons
- `GET /api/hackathons` - Get all hackathons

### Activities
- `GET /api/activities/:userId` - Get user activities

## Sample Login Credentials

### Students
Create your own account using signup

### Mentors
- Email: sarah.chen@google.com
- Password: password123

- Email: raj.kumar@microsoft.com
- Password: password123

## Environment Variables
Update `.env` file with your configuration:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - Secret key for JWT tokens
