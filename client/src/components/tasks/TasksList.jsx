import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import TaskCard from './TaskCard';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm';
const TasksList = ({ taskStatus, employees }) => {
  // Data for add and edit forms
  const initialState = {
    title: '',
    description: '',
    status: '',
    assignees: [],
    dueDate: new Date(),
  };
  const [formData, setFormData] = useState(initialState);

  // Form Dialog
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  //   Handler for Date change
  const handleDateChange = (newValue) => {
    newValue.toISOString();
    setFormData({ ...formData, dateOfBirth: newValue });
  };
  console.log(formData);
  return (
    <>
      <TaskForm
        open={open}
        handleChange={handleChange}
        handleClose={handleClose}
        taskStatus={taskStatus}
        employees={employees}
        handleDateChange={handleDateChange}
        formData={formData}
        setFormData={setFormData}
      />
      <Card
        sx={{
          minWidth: 345,
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <Box
              sx={{
                width: 0,
                bgcolor: taskStatus.color,
                padding: '0.5rem',
                mr: 2,
              }}
            />
            <Typography fontWeight='bold'>{taskStatus.title}</Typography>
            <IconButton
              color='text.Secondary'
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </CardContent>
      </Card>
    </>
  );
};

export default TasksList;
