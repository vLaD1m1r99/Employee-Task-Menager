import React, { useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { taskStatuses } from './TaskUtils';
import TasksList from './TasksList';
const ShowAllTasks = ({ employees }) => {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          position: 'relative',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          borderRadius: '15px',
          m: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
            ml: 3,
          }}
        >
          <Typography variant='h5'>Task Lists</Typography>
          <Typography variant='body2' color='textSecondary'>
            Here you can preview and manage your tasks
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'center',
            justifyContent: 'start',
            overflowX: 'auto',
          }}
        >
          {taskStatuses.map((taskStatus, index) => (
            <TasksList
              taskStatus={taskStatus}
              key={index}
              employees={employees}
            />
          ))}
        </Box>
      </Card>
    </>
  );
};

export default ShowAllTasks;
