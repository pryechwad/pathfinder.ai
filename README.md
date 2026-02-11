# PathFinder AI

AI-powered career guidance platform with TanStack Query + Supabase

## 🚀 Quick Start

**Complete setup guide:** See [SETUP_GUIDE.md](SETUP_GUIDE.md)

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Configure Supabase (see SETUP_GUIDE.md)
# 3. Run migrations in Supabase SQL Editor
# 4. Start app
npm run dev
```

## Tech Stack

**Frontend:**
- React 19.2.0 + Vite
- TanStack Query (React Query)
- Supabase Client
- Tailwind CSS
- React Router DOM

**Backend:**
- Supabase (PostgreSQL + Auth + Storage + Realtime)

## Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Create Supabase Project
- Go to https://supabase.com
- Create new project
- Copy Project URL and Anon Key

### 3. Configure Environment
Create `frontend/.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Database Migration
- Open Supabase Dashboard → SQL Editor
- Copy content from `supabase/migrations/20260211190449_initial_schema.sql`
- Execute the SQL

### 5. Start Frontend
```bash
cd frontend
npm run dev
```

## Project Structure
```
pathfinder.ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/          # TanStack Query hooks
│   │   ├── lib/            # Supabase client
│   │   └── contexts/
│   └── package.json
└── supabase/
    ├── migrations/         # SQL migrations
    └── config.toml
```

## Custom Hooks

- `useAuth()` - Authentication
- `useMentors()` - Mentors data
- `useCourses()` - Courses data
- `useBookings()` - Bookings
- `useForum()` - Forum posts

## Features

- AI Career Guidance
- Expert Mentorship
- Course Library (500+)
- Community Forum
- Study Groups
- Success Stories
- Referral System
- Real-time Updates
