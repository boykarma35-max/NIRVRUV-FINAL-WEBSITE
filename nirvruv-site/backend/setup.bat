@echo off
echo ========================================
echo    NIRVRUV BACKEND SETUP SCRIPT
echo ========================================
echo.

echo Step 1: Checking if we're in the right folder...
cd /d "%~dp0"
echo Current directory: %CD%
echo.

echo Step 2: Installing Python packages...
c:/python314/python.exe -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install packages!
    pause
    exit /b 1
)
echo Packages installed successfully!
echo.

echo Step 3: Creating .env file...
if exist .env (
    echo .env file already exists, skipping...
) else (
    copy .env.example .env
    echo .env file created from template.
)
echo.

echo Step 4: Checking MySQL connection...
echo IMPORTANT: Make sure MySQL is running and you have created the database!
echo.
echo You need to:
echo 1. Open MySQL Workbench or command line
echo 2. Run: CREATE DATABASE nirvruv_db;
echo 3. Update the .env file with your MySQL password
echo.

echo Step 5: Testing the setup...
c:/python314/python.exe -c "import flask; print('Flask version:', flask.__version__)"
c:/python314/python.exe -c "import flask_sqlalchemy; print('SQLAlchemy installed')"
c:/python314/python.exe -c "import flask_jwt_extended; print('JWT installed')"
echo.

echo ========================================
echo    SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Edit the .env file with your MySQL password
echo 2. Create the database in MySQL: CREATE DATABASE nirvruv_db;
echo 3. Run the server: c:/python314/python.exe run.py
echo.
echo Your API will be at: http://localhost:5000
echo.
pause