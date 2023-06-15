const Employee = require('../models/Employee.js');
const Task = require('../models/Task.js');
const expressAsyncHandler = require('express-async-handler');

// Get all employees
// GET /employees
// Private
const getAllEmployees = expressAsyncHandler(async (req, res) => {
  const employees = await Employee.find().lean();
  if (!employees?.length) {
    return res.status(400).json({ message: 'No employees found!' });
  }
  res.json(employees);
});

// Create a employee
// POST /employees
// Private
const createEmployee = expressAsyncHandler(async (req, res) => {
  const { fullName, photo, email, phoneNumber, dateOfBirth, monthlySalary } =
    req.body;

  // Confirm data
  if (!email || !fullName || !phoneNumber || !dateOfBirth || !monthlySalary)
    return res.status(400).json({ message: 'All fields are required!' });

  // Check for duplicate
  const duplicate = await Employee.findOne({ email }).lean().exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: 'Employee with this email already exists!' });

  // Create and store new employee
  const employeeObject = {
    fullName,
    photo,
    email,
    phoneNumber,
    dateOfBirth,
    monthlySalary,
  };
  const employee = await Employee.create(employeeObject);
  // Check if valid employee has been recived
  if (employee)
    res.status(201).json({
      message: `New employee ${employee.fullName} created`,
      employee: employee,
    });
  else res.status(400).json({ message: 'Invalid employee data received!' });
});

// Update a employee
// PATCH /employees
// Private
const updateEmployee = expressAsyncHandler(async (req, res) => {
  const {
    fullName,
    photo,
    email,
    phoneNumber,
    dateOfBirth,
    monthlySalary,
    status,
  } = req.body;
  const { id } = req.params;

  // Confirm data
  if (
    !id ||
    !email ||
    !fullName ||
    !phoneNumber ||
    !dateOfBirth ||
    !monthlySalary
  )
    return res.status(400).json({ message: 'All fields are required!' });
  const employee = await Employee.findById(id).exec();
  // Checking if emplyee has been found
  if (!employee) res.status(400).json({ message: 'Employee not found!' });
  // Checking for duplicate email
  const duplicate = await Employee.findOne({ email }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id)
    return res
      .status(409)
      .json({ message: 'Employee with this email already exists!' });
  // Updating employee's info
  employee.email = email;
  employee.fullName = fullName;
  employee.photo = photo;
  employee.phoneNumber = phoneNumber;
  employee.dateOfBirth = dateOfBirth;
  employee.monthlySalary = monthlySalary;
  employee.status = status;
  const updatedEmployee = await employee.save();
  res.json({
    message: `${updatedEmployee.email} updated`,
    employee: updatedEmployee,
  });
});

// Delete a employee
// DELETE /employees
// Private
const deleteEmployee = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Employee ID Required!' });
  // If employee has undone tasks, can't be deleted
  const employee = await Employee.findById(id).lean().exec();
  if (employee.status === 'Active')
    return res.status(400).json({ message: 'Employee has undone tasks!' });
  const deletedEmployee = await Employee.deleteOne(employee);
  res.json(
    `Employee ${deletedEmployee.fullName} with email ${deletedEmployee.email} and ID ${id} Deleted!`
  );
});
module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
