import { Outlet } from 'react-router-dom';
import React from 'react';
import { AppBar, Box, Toolbar, Link } from '@mui/material';
const Layout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <Link href='/employees' underline='none' variant='h6' color='white'>
              Employees
            </Link>
            <Link href='/tasks' underline='none' variant='h6' color='white'>
              Tasks
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;
