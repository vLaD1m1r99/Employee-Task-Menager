const Task = require('../models/Task.js');
const expressAsyncHandler = require('express-async-handler');

// Get all tasks
// GET /tasks
// Private
const getAllTasks = expressAsyncHandler(async (req, res) => {
  const tasks = await Task.find().select('title').lean();
  if (!tasks?.length) {
    return res.status(400).json({ message: 'No tasks found!' });
  }
  res.json(tasks);
});

// Create a task
// POST /tasks
// Private
const createTask = expressAsyncHandler(async (req, res) => {
  const { title, description, dueDate, assignee } = req.body;

  // Confirm data
  if (!title || !description || !dueDate || !assignee)
    return res.status(400).json({ message: 'All fields are required!' });

  // Check for duplicate
  const duplicate = await Task.findOne({ title }).lean().exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: 'Task with this title already exists!' });

  // Create and store new task
  const taskObject = {
    title,
    description,
    dueDate,
    assignee,
    completed: false,
  };
  const task = await Task.create(taskObject);
  // Check if valid task has been recived
  if (task) res.status(201).json({ message: `New task ${task} created` });
  else res.status(400).json({ message: 'Invalid task data received!' });
});

// Update a task
// PATCH /tasks
// Private
const updateTask = expressAsyncHandler(async (req, res) => {
  const { id, title, description, dueDate, assignee, completed } = req.body;

  // Confirm data
  if (!id || !title || !description || !dueDate || !assignee)
    return res.status(400).json({ message: 'All fields are required!' });
  const task = await Task.findById(id).exec();
  // Checking if task has been found
  if (!task) res.status(400).json({ message: 'Task not found!' });
  // Checking for duplicate title
  const duplicate = await Task.findOne({ title }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id)
    return res
      .status(409)
      .json({ message: 'Task with this title already exists!' });
  // Updating task's info
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.assignee = assignee;
  task.completed = completed;
  const updatedTask = await task.save();
  res.json({ message: `Task ${updatedTask.title} updated` });
});

// Delete a task
// DELETE /tasks
// Private
const deleteTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'Task ID Required!' });
  const task = await Task.findByIdAndDelete(id).exec();
  res.json(`Task ${task.title} with ID ${id} Deleted!`);
});
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
