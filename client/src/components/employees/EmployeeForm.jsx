import React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Dialog,
  DialogActions,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Avatar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
const theme = createTheme();

const EmployeeForm = ({
  open,
  handleClose,
  handleDateChange,
  handleChange,
  handleSubmit,
  formData,
  handleImageUpload,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Add New Employee
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <label
                    htmlFor='photo'
                    style={{ borderRadius: '50%', cursor: 'pointer' }}
                  >
                    <Avatar
                      src={formData?.photo || null}
                      alt={formData?.fullName || null}
                      sx={{ width: 200, height: 200, htmlFor: 'photo' }}
                    />
                  </label>
                  <input
                    hidden
                    type='file'
                    required
                    id='photo'
                    name='photo'
                    label='Profile Image'
                    accept='image/*'
                    autoComplete='picture'
                    onChange={(e) => handleImageUpload(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='fullName'
                    required
                    fullWidth
                    id='fullName'
                    label='Full Name'
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='phoneNumber'
                    label='Phone Number'
                    name='phoneNumber'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='monthlySalary'
                    label='Monthly Salary'
                    type='number'
                    id='monthlySalary'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DatePicker
                        defaultValue={dayjs('2022-04-17')}
                        onChange={handleDateChange}
                        TextField={
                          <TextField
                            name='dateOfBirth'
                            margin='dense'
                            variant='standard'
                            required
                          />
                        }
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add New Employee
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
};
export default EmployeeForm;
