import React from 'react';
import { Box, Typography, Button, Card, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const EmployeeMenager = ({ content, handleAddNewEmployee }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        position: 'relative',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        m: 5,
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', mt: 2, ml: 3, mb: 2 }}
        >
          <Typography variant='h5'>Employee List</Typography>
          <Typography variant='body2' color='textSecondary'>
            Here you can preview and manage your employees
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          size='small'
          sx={{ mt: 2, mb: 2, mr: 2 }}
          onClick={handleAddNewEmployee}
        >
          Add New Employee
        </Button>
      </Box>
      {content}
    </Card>
  );
};

export default EmployeeMenager;
