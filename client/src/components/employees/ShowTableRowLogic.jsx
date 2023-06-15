import React from 'react';
import {
  Avatar,
  IconButton,
  TextField,
  Box,
  styled,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
const ShowTableRowLogic = ({
  edit,
  row,
  column,
  handleUpdate,
  setEdit,
  value,
  handleDateChange,
  handleChange,
  handleImageUpload,
  formData,
}) => {
  // Setting up custom style for Typography
  const StyledTypography = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1rem',
  });
  // Custom Avatar
  const StyledAvatar = styled(Avatar)({
    width: 35,
    height: 35,
    htmlFor: 'photo',
  });
  {
    /* Logic for showing fields in Table row in regards to editing */
  }
  {
    switch (column.id) {
      case 'serialNumber':
        return <StyledTypography>{value}</StyledTypography>;
      case 'status':
        return (
          <StyledTypography sx={{ color: 'orange' }}>{value}</StyledTypography>
        );
      case 'actions':
        return edit.validation && row.email === edit.email ? (
          <>
            <IconButton
              size='small'
              color='primary'
              onClick={() => handleUpdate(row.id)}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              size='large'
              color='secondary'
              onClick={() => setEdit({ validation: false })}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <StyledTypography>{value}</StyledTypography>
        );
      case 'dateOfBirth':
        value = value.toString().slice(0, 10);
        return edit.validation && row.email === edit.email ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <DatePicker
                defaultValue={dayjs(Date.now)}
                onChange={handleDateChange}
                TextField={
                  <TextField name={column.id} variant='standard' required />
                }
              />
            </DemoItem>
          </LocalizationProvider>
        ) : (
          <StyledTypography>{value}</StyledTypography>
        );
      case 'fullName':
        return edit.validation && row.email === edit.email ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <label
              htmlFor='photo'
              style={{ borderRadius: '50%', cursor: 'pointer' }}
            >
              <StyledAvatar src={formData.photo || null} alt={value || null} />
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
            <TextField
              sx={{ ml: 2 }}
              defaultValue={value}
              name={column.id}
              required
              id={column.id}
              variant='standard'
              onChange={handleChange}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledAvatar src={row.photo || null} alt={value || null} />
            <StyledTypography sx={{ ml: 2 }}>{value}</StyledTypography>
          </Box>
        );
      default:
        return edit.validation && row.email === edit.email ? (
          <TextField
            defaultValue={value}
            name={column.id}
            required
            id={column.id}
            variant='standard'
            onChange={handleChange}
          />
        ) : (
          <StyledTypography>{value}</StyledTypography>
        );
    }
  }
};

export default ShowTableRowLogic;
