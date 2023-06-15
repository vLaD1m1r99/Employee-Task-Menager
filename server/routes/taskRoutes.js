const express = require('express');
const tasksController = require('../controllers/tasksController');
const router = express.Router();
router
  .route('/')
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);
module.exports = router;
