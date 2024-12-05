
const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
//const roleCheck = require('../middleware/roleCheck');
const maintenanceController = require('../controllers/maintenanceController');

// Add a maintenance log
//router.post('/maintenance', maintenanceController.addMaintenanceLog);

// View maintenance history for a laptop
//router.get('/maintenance/:laptopId', maintenanceController.viewMaintenanceHistory);

// Report an issue
router.post('/issues', maintenanceController.reportIssue);

module.exports = router;
