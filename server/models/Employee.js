const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  photo: { type: String, default: null },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  monthlySalary: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
    default: 'Inactive',
  },
});
module.exports = mongoose.model('Employee', employeeSchema);
