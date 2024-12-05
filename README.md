Laptop Management System
A MERN stack application to manage an organization's laptop inventory, assign laptops to employees, track maintenance, and report issues. The system includes role-based access for admins and employees.

Table of Contents
Features
Technologies
Installation
Usage
API Endpoints
Database Schema
License
Features
Admin:
Manage laptops (add, update, delete).
Assign laptops to employees.
Track maintenance and view logs.
Generate reports on laptop statuses.
Employee:
View assigned laptops.
Request new laptops.
Report issues with assigned laptops.
Common:
JWT-based authentication and role-based access control.
Maintenance tracking and issue reporting.
Search and filter functionalities.
Technologies
Frontend: React, React Router, Axios
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT (JSON Web Token)

Installation
Prerequisites:
Node.js and npm installed.
MongoDB installed locally or a cloud database (MongoDB Atlas).

1. Install dependencies:
bash
Copy code
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install

MONGO_URI=mongodb://localhost:27017/laptopManagement
JWT_SECRET=your_jwt_secret_key
PORT=5000
4. Start the development server:
bash
Copy code
# Start backend
cd backend
noode index.js

# Start frontend
cd ../frontend
npm start
Usage
Admin Panel:

Access the admin dashboard via the /admin route.
Manage laptops, assign them to employees, and track maintenance.
Employee Portal:

Access the employee dashboard via the /employee route.
View assigned laptops, request new ones, and report issues.
Authentication:

Login via /login route.
API Endpoints
Laptop Management:
POST /api/laptops/add - Add a new laptop.
GET /api/laptops - Get all laptops.
PUT /api/laptops/:id - Update a laptop.
DELETE /api/laptops/:id - Delete a laptop.
Employee Management:
GET /api/employees - Fetch all employees.
POST /api/employees/assign - Assign a laptop to an employee.
Maintenance & Issues:
POST /api/maintenance/add - Add a maintenance log.
GET /api/maintenance - View maintenance history.
POST /api/issues/report - Report an issue.
