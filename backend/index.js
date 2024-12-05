// Import dependencies
const express = require('express');
const cors = require('cors');
const connectDB=require('./db');
const laptopRoutes=require('./routes/laptopRoutes');
const employeeRoutes=require('./routes/employeeRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
connectDB();
// Create an express app
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Example route for get,post,update and delete
app.use('/api/laptops',laptopRoutes);
app.use('/api/employee',employeeRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
 