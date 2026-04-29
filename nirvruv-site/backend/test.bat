@echo off
echo Testing Nirvruv Backend...
echo.

echo 1. Testing Python imports...
c:/python314/python.exe -c "import flask, flask_sqlalchemy, flask_cors, flask_jwt_extended, mysql.connector; print('All imports successful!')"
if %errorlevel% neq 0 (
    echo ERROR: Import test failed!
    pause
    exit /b 1
)
echo.

echo 2. Testing database connection...
c:/python314/python.exe -c "
from app import create_app
app = create_app()
with app.app_context():
    try:
        from app import db
        db.create_all()
        print('Database connection successful!')
    except Exception as e:
        print('Database connection failed:', str(e))
        print('Make sure MySQL is running and .env file has correct password')
"
echo.

echo 3. Testing API health check...
timeout /t 2 /nobreak > nul
curl -s http://localhost:5000/api/health > nul 2>&1
if %errorlevel% neq 0 (
    echo API health check failed - server might not be running
) else (
    echo API health check passed!
)
echo.

echo Test complete!
pause