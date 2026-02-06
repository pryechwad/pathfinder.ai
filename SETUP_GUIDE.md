# 🚀 PathFinder AI - Complete Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 📦 Step 1: Install PostgreSQL

### Windows:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Set password for postgres user (remember this!)
4. Default port: 5432
5. Open pgAdmin or command line and create database:
   ```sql
   CREATE DATABASE pathfinder_db;
   ```

## 🔧 Step 2: Backend Setup

### Navigate to backend folder:
```bash
cd backend
```

### Update .env file:
Open `backend/.env` and update with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pathfinder_db?schema=public"
PORT=3001
JWT_SECRET="pathfinder-secret-key-change-in-production-2024"
NODE_ENV="development"
```

### Run setup (Automated):
```bash
setup.bat
```

### OR Manual setup:
```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### Start backend server:
```bash
npm run dev
```

Backend will run on: http://localhost:3001

## 🎨 Step 3: Frontend Setup

### Open new terminal and navigate to frontend:
```bash
cd frontend
```

### Install dependencies:
```bash
npm install
```

### Start frontend:
```bash
npm run dev
```

Frontend will run on: http://localhost:5173

## ✅ Step 4: Test the Application

### Test Backend:
Open browser and go to: http://localhost:3001/api/health
You should see: `{"status":"OK","message":"Server is running"}`

### Test Frontend:
Open browser and go to: http://localhost:5173

## 🔐 Sample Login Credentials

### Student Account:
Create new account using Sign Up

### Mentor Accounts (Pre-seeded):
- **Email:** sarah.chen@google.com  
  **Password:** password123

- **Email:** raj.kumar@microsoft.com  
  **Password:** password123

- **Email:** priya.sharma@amazon.com  
  **Password:** password123

- **Email:** amit.patel@meta.com  
  **Password:** password123

## 📊 Database Management

### View Database (Prisma Studio):
```bash
cd backend
npm run db:studio
```
Opens at: http://localhost:5555

### Reset Database:
```bash
cd backend
npm run db:push -- --force-reset
npm run db:seed
```

## 🔄 API Endpoints

### Authentication
- POST `/api/auth/signup` - Student signup
- POST `/api/auth/login` - Student login
- POST `/api/auth/mentor/signup` - Mentor signup
- POST `/api/auth/mentor/login` - Mentor login

### Student Dashboard
- GET `/api/student/dashboard/:userId` - Dashboard data
- GET `/api/courses` - All courses
- POST `/api/courses/enroll` - Enroll in course
- PATCH `/api/courses/progress/:enrollmentId` - Update progress

### Mentors
- GET `/api/mentors` - All mentors
- GET `/api/mentor/dashboard/:mentorId` - Mentor dashboard

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings/user/:userId` - User bookings
- GET `/api/bookings/mentor/:mentorId` - Mentor bookings
- PATCH `/api/bookings/:id` - Update booking

### Career Goals
- GET `/api/career-goals/:userId` - Get goals
- POST `/api/career-goals` - Create goal
- PATCH `/api/career-goals/:id` - Update goal

### Hackathons
- GET `/api/hackathons` - All hackathons

### Activities
- GET `/api/activities/:userId` - User activities

## 🐛 Troubleshooting

### Backend won't start:
1. Check if PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Run: `npm run db:push`

### Frontend can't connect to backend:
1. Ensure backend is running on port 3001
2. Check `frontend/src/utils/api.js` has correct URL

### Database errors:
1. Delete `backend/prisma/migrations` folder
2. Run: `npm run db:push -- --force-reset`
3. Run: `npm run db:seed`

### Port already in use:
- Backend: Change PORT in `.env`
- Frontend: Change port in `vite.config.js`

## 📁 Project Structure

```
pathfinder.ai/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Sample data
│   ├── .env                 # Environment variables
│   ├── server.js            # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/          # Page components
    │   ├── utils/          # API utilities
    │   └── contexts/       # React contexts
    └── package.json
```

## 🎯 Features Implemented

✅ Student & Mentor Authentication (Signup/Login)  
✅ Student Dashboard with real data  
✅ Mentor Dashboard with bookings  
✅ Course enrollment and progress tracking  
✅ Mentor session booking  
✅ Career goals management  
✅ Activity tracking  
✅ Hackathons listing  
✅ JWT-based authentication  
✅ PostgreSQL database  
✅ RESTful API  

## 🚀 Next Steps

1. Start both backend and frontend servers
2. Create a student account
3. Explore courses and mentors
4. Book a mentor session
5. Track your progress!

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Ensure PostgreSQL is running
4. Check console for error messages

Happy Learning! 🎓
