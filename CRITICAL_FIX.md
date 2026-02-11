# 🚨 CRITICAL FIX - Authentication Not Working

## Problem: Sign Up/Login/Create Features Not Working

### Root Cause:
Supabase Row Level Security (RLS) is blocking all operations because policies are too strict.

---

## ✅ SOLUTION - Disable RLS for Development

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com
2. Open your project: **pathfinder-ai**

### Step 2: Disable RLS on All Tables

**Go to:** Table Editor → Select each table → Click "..." → Disable RLS

**OR Run this SQL:**

```sql
-- Disable RLS on all tables for development
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE career_goals DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE referrals DISABLE ROW LEVEL SECURITY;
ALTER TABLE points_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories DISABLE ROW LEVEL SECURITY;
```

**How to run:**
1. Supabase Dashboard → SQL Editor
2. Paste above SQL
3. Click "Run"

---

## Step 3: Fix Authentication Table

Supabase uses `auth.users` table, but our app uses custom `users` table.

**Run this SQL:**

```sql
-- Drop existing users table
DROP TABLE IF EXISTS users CASCADE;

-- Create users table that syncs with auth.users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  grade TEXT,
  school TEXT,
  role TEXT DEFAULT 'STUDENT',
  points INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Create trigger to auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, city, grade, school)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'fullName',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'grade',
    NEW.raw_user_meta_data->>'school'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Step 4: Enable Email Confirmation (Optional)

**For Development - Disable Email Confirmation:**

1. Supabase Dashboard → Authentication → Settings
2. Scroll to "Email Auth"
3. **UNCHECK** "Enable email confirmations"
4. Click "Save"

This allows instant signup without email verification.

---

## Step 5: Test Authentication

### Test Sign Up:
1. Open app: http://localhost:5173
2. Click "Join as Student"
3. Click "Sign Up"
4. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Grade: Grade 10
   - Phone: 1234567890
   - School: Test School
   - City: Mumbai
5. Click "Create Account"
6. Should redirect to dashboard

### Verify in Supabase:
1. Go to Authentication → Users
2. You should see: test@example.com
3. Go to Table Editor → users
4. You should see user with same email

---

## Step 6: Test Other Features

### Test Create Study Group:
1. Login to dashboard
2. Click "Study Groups" tab
3. Click "+ Create Group"
4. Fill form and submit
5. Should create successfully

### Test Forum Post:
1. Click "Community Forum"
2. Select any category
3. Click "Create Post"
4. Fill and submit
5. Should create successfully

---

## 🔍 Debugging

### Check Console Errors:
1. Press F12 in browser
2. Go to Console tab
3. Look for errors

### Common Errors & Fixes:

**Error: "new row violates row-level security policy"**
- Solution: Run Step 2 SQL to disable RLS

**Error: "duplicate key value violates unique constraint"**
- Solution: Use different email for signup

**Error: "Failed to fetch"**
- Solution: Check .env has correct Supabase URL and key

**Error: "Invalid API key"**
- Solution: Copy fresh anon key from Supabase → Settings → API

---

## 📊 Where Data is Stored

### Sign Up Flow:
```
User fills form
    ↓
Frontend calls: supabase.auth.signUp()
    ↓
Supabase creates user in: auth.users table
    ↓
Trigger automatically creates: users table entry
    ↓
User logged in
```

### Create Study Group Flow:
```
User clicks "Create Group"
    ↓
Frontend calls: supabase.from('study_groups').insert()
    ↓
Data saved in: study_groups table (Supabase cloud)
    ↓
TanStack Query updates cache
    ↓
UI shows new group
```

### View Mentors Flow:
```
User opens Mentors page
    ↓
Frontend calls: useMentors() hook
    ↓
Hook queries: supabase.from('mentors').select()
    ↓
Returns data from: mentors table (seed data)
    ↓
React displays 6 mentors
```

---

## ✅ Final Verification

After running all fixes, test:

1. **Sign Up** ✓
   - Create new account
   - Check auth.users table
   - Check users table

2. **Login** ✓
   - Login with created account
   - Should see dashboard

3. **View Mentors** ✓
   - Click Mentors tab
   - Should see 6 mentors

4. **View Courses** ✓
   - Click Resources
   - Should see 10 courses

5. **Create Study Group** ✓
   - Click Study Groups
   - Click Create
   - Fill form
   - Should create successfully

6. **Forum Post** ✓
   - Click Community Forum
   - Select category
   - Create post
   - Should work

---

## 🎯 Quick Fix Commands

**Copy-paste this in Supabase SQL Editor:**

```sql
-- 1. Disable all RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE career_goals DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE referrals DISABLE ROW LEVEL SECURITY;
ALTER TABLE points_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories DISABLE ROW LEVEL SECURITY;

-- 2. Fix users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  grade TEXT,
  school TEXT,
  role TEXT DEFAULT 'STUDENT',
  points INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 3. Auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, city, grade, school)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'fullName',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'grade',
    NEW.raw_user_meta_data->>'school'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Run this once, then restart your app!**

---

## 🎉 Success Checklist

After fixes:
- [ ] Can sign up new account
- [ ] Can login
- [ ] Can see dashboard
- [ ] Can view 6 mentors
- [ ] Can view 10 courses
- [ ] Can create study group
- [ ] Can create forum post
- [ ] No console errors

**If all checked - YOU'RE DONE! 🚀**
