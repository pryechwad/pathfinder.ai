-- ✅ COMPLETE FIX FOR DATA NOT SAVING ISSUE
-- Run this in Supabase SQL Editor

-- 1. Verify all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Check if seed data is loaded
SELECT 'mentors' as table_name, COUNT(*) as count FROM mentors
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'forum_categories', COUNT(*) FROM forum_categories
UNION ALL
SELECT 'hackathons', COUNT(*) FROM hackathons
UNION ALL
SELECT 'users', COUNT(*) FROM users
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'course_enrollments', COUNT(*) FROM course_enrollments
UNION ALL
SELECT 'forum_posts', COUNT(*) FROM forum_posts;

-- 3. If seed data is missing, run the seed file:
-- Copy content from: supabase/migrations/20260211190450_seed_data.sql

-- 4. Verify RLS is disabled (for development)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
  'users', 'mentors', 'courses', 'bookings', 
  'course_enrollments', 'forum_posts', 'forum_comments',
  'success_stories', 'hackathons', 'study_groups'
);

-- 5. If RLS is enabled, disable it:
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE forum_votes DISABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members DISABLE ROW LEVEL SECURITY;

-- 6. Test insert (should work without errors)
-- Test course enrollment
INSERT INTO course_enrollments (user_id, course_id, progress)
SELECT 
  (SELECT id FROM users LIMIT 1),
  (SELECT id FROM courses LIMIT 1),
  0
WHERE EXISTS (SELECT 1 FROM users LIMIT 1)
  AND EXISTS (SELECT 1 FROM courses LIMIT 1)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- 7. Check if insert worked
SELECT * FROM course_enrollments ORDER BY enrolled_at DESC LIMIT 5;

-- 8. Verify trigger is working for new users
SELECT 
  au.id,
  au.email,
  au.created_at as auth_created,
  u.id as user_id,
  u.full_name,
  u.created_at as user_created
FROM auth.users au
LEFT JOIN public.users u ON au.id = u.id
ORDER BY au.created_at DESC
LIMIT 10;

-- 9. If users are in auth.users but not in public.users, sync them:
INSERT INTO public.users (id, email, full_name, phone, city, grade, school)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'fullName', email) as full_name,
  raw_user_meta_data->>'phone' as phone,
  raw_user_meta_data->>'city' as city,
  raw_user_meta_data->>'grade' as grade,
  raw_user_meta_data->>'school' as school
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- 10. Final verification - all counts should be > 0
SELECT 
  'mentors' as table_name, COUNT(*) as records FROM mentors
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'forum_categories', COUNT(*) FROM forum_categories
UNION ALL
SELECT 'hackathons', COUNT(*) FROM hackathons
UNION ALL
SELECT 'users', COUNT(*) FROM users;

-- ✅ If all counts show data, your backend is ready!
