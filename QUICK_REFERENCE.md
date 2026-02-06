# 🚀 PathFinder AI - Quick Reference

## 📦 Installation (First Time Only)
```bash
install.bat
```

## ▶️ Start Application
```bash
start.bat
```

## 🔧 Manual Commands

### Backend
```bash
cd backend
npm run dev          # Start server
npm run db:studio    # Open database viewer
npm run db:seed      # Reseed database
```

### Frontend
```bash
cd frontend
npm run dev          # Start frontend
npm run build        # Build for production
```

## 🌐 URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Database Studio: http://localhost:5555

## 🔐 Test Accounts

### Mentors (Pre-created)
| Email | Password | Name | Company |
|-------|----------|------|---------|
| sarah.chen@google.com | password123 | Sarah Chen | Google |
| raj.kumar@microsoft.com | password123 | Raj Kumar | Microsoft |
| priya.sharma@amazon.com | password123 | Priya Sharma | Amazon |
| amit.patel@meta.com | password123 | Amit Patel | Meta |

### Students
Create your own account via Sign Up

## 📊 Database Info
- **Database Name:** pathfinder_db
- **Default Port:** 5432
- **Default User:** postgres

## 🔄 Reset Database
```bash
cd backend
npm run db:push -- --force-reset
npm run db:seed
```

## 📁 Important Files
- `backend/.env` - Database connection & secrets
- `backend/server.js` - API server
- `backend/prisma/schema.prisma` - Database schema
- `frontend/src/utils/api.js` - API client

## 🐛 Common Issues

### "Port already in use"
- Backend: Change PORT in `backend/.env`
- Frontend: Kill process or change port in `vite.config.js`

### "Database connection failed"
- Check PostgreSQL is running
- Verify credentials in `backend/.env`
- Ensure database `pathfinder_db` exists

### "Module not found"
```bash
# Backend
cd backend && npm install

# Frontend  
cd frontend && npm install
```

## 📞 Quick Help
1. Check SETUP_GUIDE.md for detailed instructions
2. Check backend/README.md for API documentation
3. Ensure PostgreSQL is installed and running
4. Verify .env file has correct credentials

## ✅ Features
- ✅ Student & Mentor Authentication
- ✅ Student Dashboard
- ✅ Mentor Dashboard  
- ✅ Course Management
- ✅ Session Booking
- ✅ Career Goals
- ✅ Hackathons
- ✅ Activity Tracking

## 🎯 Tech Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT

---
Made with ❤️ for PathFinder AI
