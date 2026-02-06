# 🏗️ Backend Structure - Proper MVC Architecture

## 📁 Folder Structure

```
backend/
├── config/
│   └── database.js          # Prisma client configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── studentController.js # Student dashboard & courses
│   ├── mentorController.js  # Mentor dashboard & management
│   ├── bookingController.js # Session booking logic
│   └── otherController.js   # Career goals & hackathons
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── studentRoutes.js     # Student endpoints
│   ├── mentorRoutes.js      # Mentor endpoints
│   ├── courseRoutes.js      # Course endpoints
│   ├── bookingRoutes.js     # Booking endpoints
│   └── otherRoutes.js       # Other endpoints
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.js              # Sample data
├── .env                     # Environment variables
├── server.js                # Main server file
└── package.json             # Dependencies
```

## 🎯 Architecture Pattern

### MVC (Model-View-Controller)
- **Models**: Prisma schema (database models)
- **Controllers**: Business logic
- **Routes**: API endpoints

## 📊 Database Name
**Database:** `pathfinder_ai`

## 🔧 Setup Steps

### 1. Create PostgreSQL Database
```sql
CREATE DATABASE pathfinder_ai;
```

### 2. Update .env
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pathfinder_ai?schema=public"
```

### 3. Install & Setup
```bash
cd backend
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## 🌐 API Structure

### Authentication (`/api/auth`)
- POST `/signup` - Student signup
- POST `/login` - Student login
- POST `/mentor/signup` - Mentor signup
- POST `/mentor/login` - Mentor login

### Student (`/api/student`)
- GET `/dashboard/:userId` - Dashboard data
- GET `/activities/:userId` - User activities

### Mentors (`/api/mentors`)
- GET `/` - All mentors
- GET `/dashboard/:mentorId` - Mentor dashboard

### Courses (`/api/courses`)
- GET `/` - All courses
- POST `/enroll` - Enroll in course
- PATCH `/progress/:enrollmentId` - Update progress

### Bookings (`/api/bookings`)
- POST `/` - Create booking
- GET `/user/:userId` - User bookings
- GET `/mentor/:mentorId` - Mentor bookings
- PATCH `/:id` - Update booking

### Other (`/api`)
- GET `/career-goals/:userId` - Get goals
- POST `/career-goals` - Create goal
- PATCH `/career-goals/:id` - Update goal
- GET `/hackathons` - All hackathons

## ✅ Features

### Real-Time Data
- ✅ All data from PostgreSQL database
- ✅ No hardcoded values
- ✅ Dynamic stats calculation
- ✅ Automatic activity logging

### Security
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected routes
- ✅ Role-based access

### Clean Code
- ✅ Separated concerns
- ✅ Reusable controllers
- ✅ Organized routes
- ✅ Middleware pattern

## 🚀 How It Works

### 1. Request Flow
```
Client Request
    ↓
Express Server (server.js)
    ↓
Route (routes/*.js)
    ↓
Middleware (auth.js) [if protected]
    ↓
Controller (controllers/*.js)
    ↓
Database (Prisma)
    ↓
Response to Client
```

### 2. Example: Student Login
```
POST /api/auth/login
    ↓
authRoutes.js
    ↓
authController.studentLogin()
    ↓
Check credentials in database
    ↓
Generate JWT token
    ↓
Return token + user data
```

## 📝 Key Files

### server.js
- Main entry point
- Connects all routes
- Starts Express server

### config/database.js
- Prisma client instance
- Used by all controllers

### middleware/auth.js
- JWT verification
- Protects routes
- Adds user to request

### controllers/*.js
- Business logic
- Database operations
- Response formatting

### routes/*.js
- API endpoints
- Route definitions
- Middleware application

## 🎓 Benefits

1. **Maintainable**: Easy to find and update code
2. **Scalable**: Add new features easily
3. **Testable**: Each part can be tested separately
4. **Clean**: No code duplication
5. **Professional**: Industry-standard structure

## 🔄 Data Flow Example

### Student Dashboard
```javascript
// Frontend calls
GET /api/student/dashboard/user123

// Route receives
studentRoutes.js → authenticateToken → studentController.getDashboard

// Controller fetches
- User data
- Enrolled courses
- Career goals
- Activities
- Bookings

// Calculates stats
- Courses completed
- Skill progress
- Mentor sessions

// Returns JSON
{
  user: {...},
  stats: {...}
}
```

## 🎉 Result

✅ Clean, organized backend
✅ Real database integration
✅ No hardcoded data
✅ Professional structure
✅ Easy to maintain
✅ Ready for production

---

**All data is now coming from PostgreSQL database!** 🚀
