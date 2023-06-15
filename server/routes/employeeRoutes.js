const express = require('express');
const employeesController = require('../controllers/employeesController');
const router = express.Router();
// Routes that require not params
router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.createEmployee);
// Routes that require id from params
router
  .route('/:id')
  .patch(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);
module.exports = router;
