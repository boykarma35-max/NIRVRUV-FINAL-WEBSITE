# Nirvruv Backend - SIMPLE SETUP GUIDE

## 🚀 QUICK START (3 Easy Steps)

### Step 1: Run Setup
Double-click `setup.bat` file in the backend folder.

### Step 2: Set Up Database
1. Open MySQL Workbench (or command line)
2. Connect to your MySQL server
3. Run this command: `CREATE DATABASE nirvruv_db;`
4. Open the `.env` file and change `your_password` to your actual MySQL password

### Step 3: Start Server
Double-click `start.bat` file.

**That's it!** Your API will be running at `http://localhost:5000`

---

## 📋 DETAILED STEP-BY-STEP GUIDE

### Step 1: Install Software
You need these installed:
- ✅ Python (already installed)
- ✅ MySQL Server (download from https://dev.mysql.com/downloads/mysql/)
- ✅ MySQL Workbench (optional, for easy database management)

### Step 2: Run Setup Script
1. Open the `backend` folder
2. Double-click `setup.bat`
3. Wait for it to finish installing packages

### Step 3: Create Database
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Create a new schema" (database)
4. Name it: `nirvruv_db`
5. Click "Apply"

### Step 4: Configure Password
1. Open the `.env` file in the backend folder
2. Find this line: `DATABASE_URL=mysql+mysqlconnector://root:your_password@localhost:3306/nirvruv_db`
3. Replace `your_password` with your actual MySQL root password
4. Save the file

### Step 5: Start the Server
1. Double-click `start.bat`
2. You should see: "Running on http://localhost:5000"
3. Keep this window open - the server is running!

### Step 6: Test It Works
1. Double-click `test.bat` to run tests
2. Or open browser and go to: `http://localhost:5000/api/health`
3. You should see: `{"status":"ok","message":"Server is running"}`

---

## 🧪 TEST THE API

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Get Services
```bash
curl http://localhost:5000/api/services
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contacts ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"subject\":\"Test\",\"message\":\"Hello!\"}"
```

---

## 📁 FILE STRUCTURE

```
backend/
├── setup.bat      <- Double-click this first
├── start.bat      <- Double-click this to run server
├── test.bat       <- Double-click this to test
├── .env           <- Edit this with your MySQL password
├── requirements.txt
├── run.py
├── app/
│   ├── models/    <- Database tables
│   ├── routes/    <- API endpoints
│   └── utils/     <- Helper functions
└── README.md      <- This file
```

---

## 🆘 TROUBLESHOOTING

### "MySQL connection failed"
- Make sure MySQL server is running
- Check your password in `.env` file
- Make sure database `nirvruv_db` exists

### "Port 5000 already in use"
- Close other applications using port 5000
- Or change port in `.env` file: `FLASK_PORT=5001`

### "Python not found"
- Make sure Python is installed correctly
- The setup script uses: `c:/python314/python.exe`

### Server won't start
- Run `test.bat` to see error messages
- Check that all files are in the backend folder
- Make sure MySQL is running

---

## 🎯 WHAT THIS BACKEND DOES

- ✅ User registration and login
- ✅ Manage services (add/edit/delete)
- ✅ Manage courses (add/edit/delete)
- ✅ Handle contact form submissions
- ✅ Admin panel for managing content
- ✅ Secure API with JWT tokens
- ✅ MySQL database storage

Your frontend can now connect to `http://localhost:5000` to get data!
