require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const cookieParses = require('cookie-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParses());
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});
