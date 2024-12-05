const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//const roleCheck = require('../middleware/roleCheck');
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Add a new employee
router.post('/register', employeeController.addEmployee);
router.post('/login', employeeController.loginEmployee);
// Fetch laptops assigned to  employee
router.get('/allassignedlaptops', employeeController.fetchAllLaptopsAssignedToEmployee);

// Assign a laptop to an employee
router.post('/assign-laptop', employeeController.assignLaptop);

router.get('/assignments/:employeeId', employeeController.fetchLaptopsAssignedToEmployee);
module.exports = router;
