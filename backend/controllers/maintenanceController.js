const Maintenance = require('../models/Maintenance');
const Issue = require('../models/Issue');
const Laptop = require('../models/Laptop');
const Employee=require("../models/Employee")

 //Add a maintenance log
exports.addMaintenanceLog = async (req, res) => {
  try {
    const { laptopId, description, status, cost } = req.body;

    // Check if laptop exists
    const laptop = await Laptop.findById(laptopId);
    if (!laptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }

    const maintenance = new Maintenance({
      laptopId,
      description,
      status,
      cost,
      loggedAt: new Date(),
    });

    await maintenance.save();
    // Update laptop status if in maintenance
    if (status === 'maintenance') {
      laptop.status = 'maintenance';
      await laptop.save();
    }

   res.status(201).json({ message: 'Maintenance log added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View maintenance history
exports.viewMaintenanceHistory = async (req, res) => {
  try {
    const { laptopId } = req.params;

    const maintenanceLogs = await Maintenance.find({ laptopId }).sort({ loggedAt: -1 });
    res.status(200).json(maintenanceLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Report an issue
exports.reportIssue = async (req, res) => {
  try {
    const { laptopId, description, priority, reportedBy } = req.body;

    // Check if laptop exists
    const laptop = await Laptop.findById(laptopId);
    if (!laptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }

    const issue = new Issue({
      laptopId,
      description,
      priority,
      status: 'open',
      reportedBy,
      reportedAt: new Date(),
    });

    await issue.save();

    res.status(201).json({ message: 'Issue reported successfully', issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
