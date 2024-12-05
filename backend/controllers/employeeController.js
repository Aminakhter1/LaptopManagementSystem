const Employee = require('../models/Employee');
const Assignment = require('../models/Assignment');
const Laptop = require('../models/Laptop');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  {comparePassword ,hashPassword } = require('../helpers/authHelpers');
const JWT =require("jsonwebtoken");
//const Employee = require('../models/Employee');
//const dotenv = require('dotenv');

//dotenv.config();
JWT_SECRET="AM@#IN"

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, password, role } = req.body;

 // Check if the email is already taken
 const existingEmployee = await Employee.findOne({ email });
 if (existingEmployee) {
   return res.status(400).json({ message: 'Employee with this email already exists' });
 }

 // Hash the password before saving
 //const salt = await bcrypt.genSalt(10);
 //const hashedPassword = await bcrypt.hash(password, salt);
 const hashedPassword = await hashPassword(password);
 // Create new employee
 const newEmployee = new Employee({
   name,
   email,
   department,
   password: hashedPassword, // save the hashed password
   role,
 });

 // Save the employee to the database
 await newEmployee.save();

 res.status(201).json({
   message: 'Employee added successfully',
   employee: {
     name: newEmployee.name,
     email: newEmployee.email,
     department: newEmployee.department,
     role: newEmployee.role,
   },
 });

   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch laptops assigned 
exports.fetchAllLaptopsAssignedToEmployee = async (req, res) => {
  try {
    
    const assignment = await Assignment.find();
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Assign a laptop to an employee
exports.assignLaptop = async (req, res) => {
    try {
      const { laptopId, employeeId } = req.body;
  
      // Check if the laptop exists and is available
      const laptop = await Laptop.findById(laptopId);
      if (!laptop) {
        return res.status(404).json({ message: 'Laptop not found' });
      }
      if (laptop.status !== 'available') {
        return res.status(400).json({ message: 'Laptop is not available for assignment' });
      }
  
      // Check if the employee exists
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Create a new assignment
      const assignment = new Assignment({
        laptopId,
        employeeId,
        assignedAt: new Date(),
      });
  
      await assignment.save();
  
      // Update the laptop status to 'assigned'
      laptop.status = 'assigned';
      await laptop.save();
  
      res.status(201).json({
        message: 'Laptop assigned successfully',
        assignment,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //fetch single assigned employye

exports.fetchLaptopsAssignedToEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Find all assignments for the specific employee
    const assignments = await Assignment.find({ employeeId }).populate('laptopId');

    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No laptops assigned to this employee.' });
    }

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  



// Login controller for employees
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find employee by email
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
     // Compare password with hashed password in the databas
   
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }





  
   
};



  

  