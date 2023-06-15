import React from 'react';
import { LinearProgress, Typography } from '@mui/material';
import ShowAllTasks from './ShowAllTasks';
import useSWR from 'swr';
import {
  getAllEmployees,
  UrlEndpoint as cacheKey,
} from '../../api/employeesApi';
const TasksData = () => {
  //   Setting up SWR
  const {
    isLoading,
    error,
    data: employees,
  } = useSWR(cacheKey, getAllEmployees, {});
  let content;
  if (isLoading) {
    content = (
      <LinearProgress
        variant='query'
        color='secondary'
        sx={{ width: '100vw' }}
      />
    );
  } else if (error) {
    content = (
      <Typography variant='h6' align='center' m={3}>
        {error.message}
      </Typography>
    );
  } else {
    content = <ShowAllTasks employees={employees} />;
  }
  return content;
};

export default TasksData;
