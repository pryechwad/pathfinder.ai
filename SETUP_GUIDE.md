# PathFinder AI - Complete Setup Guide

## 📋 Prerequisites
- Node.js v18+ installed
- Internet connection
- Web browser

---

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Account & Project

1. **Go to Supabase**
   - Open browser: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub/Google/Email

2. **Create New Project**
   - Click "New Project"
   - Fill details:
     - **Name:** pathfinder-ai
     - **Database Password:** (create strong password - SAVE THIS!)
     - **Region:** Choose closest to you (e.g., Mumbai for India)
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get API Keys**
   - Project created ho jane ke baad
   - Left sidebar → Settings (⚙️) → API
   - Copy these 2 things:
     - **Project URL:** `https://xxxxx.supabase.co`
     - **anon public key:** `eyJhbGc...` (long key)

---

### Step 2: Setup Database Schema

1. **Open SQL Editor**
   - Left sidebar → SQL Editor
   - Click "+ New query"

2. **Run Schema Migration**
   - Open file: `supabase/migrations/20260211190449_initial_schema.sql`
   - Copy ENTIRE content (Ctrl+A, Ctrl+C)
   - Paste in SQL Editor
   - Click "Run" button (bottom right)
   - Wait for "Success" message

3. **Verify Tables Created**
   - Left sidebar → Table Editor
   - You should see tables:
     - users
     - mentors
     - courses
     - bookings
     - forum_posts
     - study_groups
     - success_stories
     - etc.

---

### Step 3: Add Sample Data (Seed)

1. **Open SQL Editor Again**
   - SQL Editor → "+ New query"

2. **Run Seed Data**
   - Open file: `supabase/migrations/20260211190450_seed_data.sql`
   - Copy ENTIRE content
   - Paste in SQL Editor
   - Click "Run"
   - Wait for "Success"

3. **Verify Data**
   - Table Editor → mentors table
   - You should see 6 mentors (Rahul, Priya, Amit, etc.)
   - Table Editor → courses table
   - You should see 10 courses
   - Table Editor → forum_categories
   - You should see 8 categories

---

### Step 4: Configure Frontend

1. **Update .env File**
   - Open: `frontend/.env`
   - Replace with YOUR keys:
   ```env
   VITE_SUPABASE_URL=https://bycqaaabdagnsfdjzlyx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Y3FhYWFiZGFnbnNmZGp6bHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDQxODgsImV4cCI6MjA4NjM4MDE4OH0.FVORKFRjRBo_05WBdgvsAU6TjNypaPldL5xjS3WSVGQ
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```
   - Wait for installation (1-2 minutes)

---

### Step 5: Start Application

1. **Run Development Server**
   ```bash
   npm run dev
   ```

2. **Open Browser**
   - Go to: http://localhost:5173
   - You should see PathFinder AI landing page

---

## ✅ Verification Checklist

### Database Check:
- [ ] All tables visible in Table Editor
- [ ] 6 mentors in mentors table
- [ ] 10 courses in courses table
- [ ] 8 categories in forum_categories table
- [ ] 4 hackathons in hackathons table

### Frontend Check:
- [ ] Landing page loads
- [ ] Can see "Join as Student" button
- [ ] Can see "Join as Mentor" button
- [ ] No console errors (F12 → Console)

---

## 🎯 Testing the App

### Test 1: View Mentors
1. Click "Join as Student"
2. Click "Sign Up"
3. Fill form and create account
4. After login, you should see dashboard
5. Click "Mentors" tab
6. You should see 6 mentors with photos

### Test 2: View Courses
1. In dashboard, click "Resources" or "Courses"
2. You should see 10 courses
3. Each course has title, description, price

### Test 3: Forum
1. Click "Community Forum"
2. You should see 8 categories:
   - Data Science & AI
   - Engineering
   - Medical & Healthcare
   - Business & Management
   - Creative Arts
   - Law & Civil Services
   - Career Guidance
   - Study Tips

---

## 🔍 Where is Data Coming From?

### Data Flow:

```
Frontend (React)
    ↓
TanStack Query Hooks
    ↓
Supabase Client
    ↓
Supabase Cloud Database
    ↓
PostgreSQL Tables
```

### Example: Fetching Mentors

**Code:**
```javascript
// frontend/src/hooks/useMentors.js
const { data: mentors } = useMentors();
```

**What Happens:**
1. Hook calls Supabase client
2. Supabase queries `mentors` table
3. Returns data from cloud database
4. TanStack Query caches it
5. React displays it

### Example: Creating Booking

**Code:**
```javascript
const createBooking = useCreateBooking();
await createBooking.mutateAsync({ userId, mentorId, date, time });
```

**What Happens:**
1. Hook calls Supabase client
2. Supabase inserts into `bookings` table
3. Data saved in cloud database
4. TanStack Query updates cache
5. UI updates automatically

---

## 📊 Database Tables & Their Purpose

| Table | Purpose | Sample Data |
|-------|---------|-------------|
| `users` | Student accounts | Created when you sign up |
| `mentors` | Mentor profiles | 6 mentors (Rahul, Priya, etc.) |
| `courses` | Course catalog | 10 courses (Web Dev, ML, etc.) |
| `bookings` | Mentor sessions | Created when booking mentor |
| `course_enrollments` | Student enrollments | Created when enrolling course |
| `forum_posts` | Forum discussions | Created when posting |
| `forum_categories` | Forum topics | 8 categories (AI, Engineering, etc.) |
| `study_groups` | Study groups | Created by students |
| `success_stories` | Alumni stories | Created by students |
| `hackathons` | Competitions | 4 hackathons |

---

## 🐛 Troubleshooting

### Issue 1: "Failed to fetch"
**Solution:**
- Check internet connection
- Verify Supabase URL in .env
- Check Supabase project is running (green dot in dashboard)

### Issue 2: "No data showing"
**Solution:**
- Go to Supabase → Table Editor
- Check if tables have data
- If empty, run seed SQL again

### Issue 3: "Authentication error"
**Solution:**
- Check ANON_KEY in .env
- Go to Supabase → Settings → API
- Copy fresh anon key

### Issue 4: "RLS policy violation"
**Solution:**
- Go to Supabase → Authentication → Policies
- Check if policies are enabled
- For testing, you can disable RLS temporarily

---

## 📱 How to Use the App

### As Student:

1. **Sign Up**
   - Click "Join as Student"
   - Fill: Name, Email, Password, Grade, Phone, School, City
   - Click "Create Account"

2. **Explore Dashboard**
   - See recommended career paths
   - View your progress
   - Check activities

3. **Book Mentor**
   - Go to "Mentors" tab
   - Click on any mentor
   - Click "Book Session"
   - Select date & time
   - Confirm booking

4. **Enroll Course**
   - Go to "Resources"
   - Browse courses
   - Click "Enroll Now"
   - Start learning

5. **Join Forum**
   - Go to "Community Forum"
   - Select category
   - Create post or comment

### As Mentor:

1. **Sign Up**
   - Click "Join as Mentor"
   - Fill: Name, Title, Company, Experience, Location
   - Click "Create Account"

2. **View Dashboard**
   - See upcoming sessions
   - Check earnings
   - View student bookings

---

## 🎨 Customization

### Add More Mentors:
```sql
INSERT INTO mentors (email, name, title, company, expertise, experience, rating, price, location, languages)
VALUES ('new@email.com', 'New Mentor', 'Job Title', 'Company', ARRAY['Skill1', 'Skill2'], '5 years', 4.5, 2000, 'City', ARRAY['English']);
```

### Add More Courses:
```sql
INSERT INTO courses (title, description, category, duration, level, instructor, rating, price)
VALUES ('New Course', 'Description', 'Technology', '10 weeks', 'Beginner', 'Instructor Name', 4.5, 3999);
```

---

## 📞 Support

**If stuck:**
1. Check console errors (F12 → Console)
2. Check Supabase logs (Dashboard → Logs)
3. Verify .env file has correct keys
4. Ensure all migrations ran successfully

**Common Commands:**
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## ✨ Success!

If you can:
- ✅ See landing page
- ✅ Sign up as student
- ✅ View 6 mentors
- ✅ See 10 courses
- ✅ Access forum with 8 categories

**Congratulations! Setup complete! 🎉**

Your PathFinder AI is now running with:
- Real-time database (Supabase)
- Smart caching (TanStack Query)
- Sample data (6 mentors, 10 courses, 4 hackathons)
- Full authentication
- All features working!
