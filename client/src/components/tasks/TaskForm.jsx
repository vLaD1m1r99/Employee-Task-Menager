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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AssigneeSelect from './AssigneeSelect';
const theme = createTheme();
const TaskForm = ({
  open,
  handleClose,
  handleChange,
  handleDateChange,
  taskStatus,
  employees,
  formData,
  setFormData,
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
            <Typography component='h4' variant='h5' fontWeight='bold'>
              Add New Task
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mr: 'auto',
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
              <Typography variant='h6' fontWeight='bold'>
                {taskStatus.title}
              </Typography>
            </Box>
            <Box
              component='form'
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name='title'
                    required
                    fullWidth
                    id='title'
                    label='Task Title'
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DatePicker
                        defaultValue={dayjs('2023-04-17')}
                        onChange={handleDateChange}
                        TextField={
                          <TextField
                            name='dueDate'
                            margin='dense'
                            variant='standard'
                            required
                          />
                        }
                      />
                    </DemoItem>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <AssigneeSelect
                    employees={employees}
                    setFormData={setFormData}
                    formData={formData}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='description'
                    label='Description'
                    name='description'
                    multiline
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add New Task
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
};

export default TaskForm;
