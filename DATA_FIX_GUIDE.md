# 🔧 DATA NOT SAVING - COMPLETE FIX GUIDE

## Problem: Koi bhi data backend mein save nahi ho raha
- ❌ Course enrollments nahi ho rahe
- ❌ Bookings create nahi ho rahe  
- ❌ Forum posts nahi ban rahe
- ❌ Success stories submit nahi ho rahe
- ❌ Hackathon registrations nahi ho rahe

## Root Cause: Column Name Mismatch
**Database:** snake_case (`user_id`, `course_id`, `created_at`)  
**Frontend Hooks:** camelCase (`userId`, `courseId`, `createdAt`)

---

## ✅ FIXES APPLIED

### 1. Fixed Hooks (Column Names)
- ✅ `useCourses.js` - Fixed `user_id`, `course_id`
- ✅ `useBookings.js` - Fixed `user_id`
- ✅ `useForum.js` - Fixed `category_id`, `post_id`, `user_id`, `vote_type`, `created_at`, `full_name`

### 2. Fixed Auth Integration
- ✅ `Login.jsx` - Now uses Supabase auth properly
- ✅ User metadata properly passed to trigger

---

## 🚀 SETUP STEPS

### Step 1: Run Database Migrations

**A. Schema (Tables)**
```bash
# Supabase Dashboard → SQL Editor → New Query
# Copy paste: supabase/migrations/20260211190449_initial_schema.sql
# Click RUN
```

**B. Seed Data (Sample Data)**
```bash
# Supabase Dashboard → SQL Editor → New Query
# Copy paste: supabase/migrations/20260211190450_seed_data.sql
# Click RUN
```

**C. Verify & Fix (Optional)**
```bash
# Supabase Dashboard → SQL Editor → New Query
# Copy paste: supabase/migrations/99_verify_and_fix.sql
# Click RUN
```

### Step 2: Restart Frontend
```bash
cd frontend
npm run dev
```

### Step 3: Test Each Feature

#### ✅ Test 1: User Signup
1. Go to signup page
2. Fill student details
3. Submit
4. **Check:** Supabase → Table Editor → `users` (should have new user)

#### ✅ Test 2: View Mentors
1. Go to mentors page
2. **Check:** Should see 6 mentors (Rahul, Priya, Amit, etc.)

#### ✅ Test 3: View Courses
1. Go to courses page
2. **Check:** Should see 10 courses

#### ✅ Test 4: Course Enrollment
1. Click on any course
2. Click "Enroll Now"
3. **Check:** Supabase → `course_enrollments` (should have new entry)

#### ✅ Test 5: Mentor Booking
1. Click on any mentor
2. Book a session
3. **Check:** Supabase → `bookings` (should have new booking)

#### ✅ Test 6: Forum Post
1. Go to community forum
2. Create new post
3. **Check:** Supabase → `forum_posts` (should have new post)

#### ✅ Test 7: Success Story
1. Go to success stories
2. Submit your story
3. **Check:** Supabase → `success_stories` (should have new story)

---

## 🔍 DEBUGGING

### Check 1: Are tables created?
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Check 2: Is seed data loaded?
```sql
SELECT COUNT(*) FROM mentors;  -- Should be 6
SELECT COUNT(*) FROM courses;  -- Should be 10
SELECT COUNT(*) FROM forum_categories;  -- Should be 8
SELECT COUNT(*) FROM hackathons;  -- Should be 4
```

### Check 3: Is RLS disabled?
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- rowsecurity should be FALSE for all tables
```

### Check 4: Are users syncing?
```sql
-- Check auth users
SELECT COUNT(*) FROM auth.users;

-- Check public users
SELECT COUNT(*) FROM public.users;

-- Should be same count!
```

### Check 5: Test manual insert
```sql
-- Try inserting a test record
INSERT INTO course_enrollments (user_id, course_id)
VALUES (
  (SELECT id FROM users LIMIT 1),
  (SELECT id FROM courses LIMIT 1)
);

-- If this works, hooks are the issue
-- If this fails, database permissions are the issue
```

---

## 🎯 COMMON ERRORS & FIXES

### Error: "column 'userId' does not exist"
**Fix:** Column name mismatch - already fixed in hooks

### Error: "null value in column 'user_id' violates not-null constraint"
**Fix:** User not logged in or user ID not passed correctly
```javascript
// Make sure to pass user ID:
const { user } = useAuth();
createBooking({ user_id: user.id, mentor_id: mentorId, ... });
```

### Error: "insert or update on table violates foreign key constraint"
**Fix:** Referenced record doesn't exist
```javascript
// Make sure user exists in users table first
// Check: SELECT * FROM users WHERE id = 'user-uuid';
```

### Error: "duplicate key value violates unique constraint"
**Fix:** Record already exists
```javascript
// Use upsert instead of insert:
.upsert([data])
// Or check if exists first
```

---

## 📊 EXPECTED DATA COUNTS

After setup, you should see:
- ✅ **mentors:** 6 records
- ✅ **courses:** 10 records
- ✅ **forum_categories:** 8 records
- ✅ **hackathons:** 4 records
- ✅ **users:** 1+ (after signup)
- ✅ **bookings:** 0 (will increase when users book)
- ✅ **course_enrollments:** 0 (will increase when users enroll)
- ✅ **forum_posts:** 0 (will increase when users post)

---

## 🎉 SUCCESS CHECKLIST

- [ ] Schema migration run successfully
- [ ] Seed data migration run successfully
- [ ] Mentors visible on frontend (6 mentors)
- [ ] Courses visible on frontend (10 courses)
- [ ] User signup creates entry in `users` table
- [ ] Course enrollment creates entry in `course_enrollments`
- [ ] Booking creates entry in `bookings`
- [ ] Forum post creates entry in `forum_posts`
- [ ] No console errors in browser
- [ ] No errors in Supabase logs

---

## 🆘 STILL NOT WORKING?

1. **Check Browser Console:** Press F12 → Console tab
2. **Check Network Tab:** See what API calls are failing
3. **Check Supabase Logs:** Dashboard → Logs → API Logs
4. **Verify .env file:** Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
5. **Restart everything:**
   ```bash
   # Kill frontend
   Ctrl+C
   
   # Clear cache
   npm run dev -- --force
   ```

---

## 📝 QUICK REFERENCE

### Database Column Names (snake_case)
```
user_id, mentor_id, course_id, post_id, category_id
created_at, updated_at, enrolled_at, joined_at
full_name, is_premium, is_pinned, is_solved
vote_type, order_id, payment_id
```

### Frontend Usage (convert to snake_case)
```javascript
// ❌ Wrong
{ userId: user.id, courseId: course.id }

// ✅ Correct
{ user_id: user.id, course_id: course.id }
```

---

**Last Updated:** After fixing all hooks
**Status:** ✅ Ready to use
