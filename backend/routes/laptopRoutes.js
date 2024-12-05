const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController');
//const auth = require('../middleware/auth');
//const roleCheck = require('../middleware/roleCheck');

router.post('/',laptopController.addLaptop);
router.get('/', laptopController.getLaptops);
router.put('/:id', laptopController.updateLaptop);
router.delete('/:id', laptopController.deleteLaptop);

module.exports = router;
