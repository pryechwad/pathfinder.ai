@echo off
echo ========================================
echo PathFinder AI Backend Setup
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
echo.

echo Step 2: Generating Prisma Client...
call npm run db:generate
echo.

echo Step 3: Pushing schema to database...
call npm run db:push
echo.

echo Step 4: Seeding database with sample data...
call npm run db:seed
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the server, run: npm run dev
echo.
pause
