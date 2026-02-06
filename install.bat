@echo off
echo ========================================
echo PathFinder AI - Complete Installation
echo ========================================
echo.
echo This will install all dependencies for both frontend and backend.
echo Please ensure PostgreSQL is installed and running.
echo Database name: pathfinder_ai
echo.
pause

echo.
echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [2/4] Setting up Database...
call npm run db:generate
if errorlevel 1 (
    echo ERROR: Prisma generate failed!
    pause
    exit /b 1
)

call npm run db:push
if errorlevel 1 (
    echo ERROR: Database push failed! Please check your PostgreSQL connection.
    echo Make sure to update DATABASE_URL in backend/.env file
    pause
    exit /b 1
)

call npm run db:seed
if errorlevel 1 (
    echo WARNING: Database seeding failed, but you can continue.
)
echo ✓ Database setup complete
echo.

cd ..

echo [3/4] Installing Frontend Dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

cd ..

echo [4/4] Installation Complete!
echo.
echo ========================================
echo 🎉 Setup Successful!
echo ========================================
echo.
echo Next Steps:
echo 1. Update backend/.env with your PostgreSQL credentials
echo 2. Run 'start.bat' to start both servers
echo 3. Open http://localhost:5173 in your browser
echo.
echo Sample Mentor Login:
echo Email: sarah.chen@google.com
echo Password: password123
echo.
echo ========================================
pause
