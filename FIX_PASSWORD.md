# ⚠️ IMPORTANT: Update Your PostgreSQL Password

## The Issue
The backend is trying to connect to PostgreSQL with password "password", but you need to use YOUR actual PostgreSQL password.

## Quick Fix (2 Steps)

### Step 1: Find Your PostgreSQL Password
- This is the password you set when installing PostgreSQL
- Usually it's the password for the "postgres" user

### Step 2: Update .env File
Open: `backend/.env`

Change this line:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/pathfinder_ai?schema=public"
```

To (replace YOUR_PASSWORD with your actual password):
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pathfinder_ai?schema=public"
```

## Example
If your PostgreSQL password is "admin123", it should be:
```
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/pathfinder_ai?schema=public"
```

## After Updating

Run these commands:
```bash
cd backend
node prisma/seed.js
npm run dev
```

## If You Forgot Your PostgreSQL Password

### Windows:
1. Open pgAdmin
2. Right-click on PostgreSQL server
3. Properties → Connection
4. Or reset password using pgAdmin

### Or Create New Database User:
```sql
-- Open pgAdmin or psql
CREATE USER pathfinder WITH PASSWORD 'your_new_password';
ALTER USER pathfinder CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE pathfinder_ai TO pathfinder;
```

Then update .env:
```
DATABASE_URL="postgresql://pathfinder:your_new_password@localhost:5432/pathfinder_ai?schema=public"
```

---

**After fixing, run:**
```bash
cd backend
node prisma/seed.js
npm run dev
```
