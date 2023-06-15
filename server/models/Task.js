const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  assignee: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
  ],
  completed: { type: Date, default: null },
  status: {
    type: String,
    required: true,
    enum: ['To do', 'Doing', 'Under review'],
  },
});
module.exports = mongoose.model('Task', taskSchema);
