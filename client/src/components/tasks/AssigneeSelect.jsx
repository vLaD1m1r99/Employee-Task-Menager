import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
// const getStyles = (name, personName, theme) => {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// };

const AssigneeSelect = ({ employees, setFormData, formData }) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    // setFormData({ ...formData, assignees: formData.assignees.push(value) });
    formData.assignees.push(value[0]);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='assigneeSelect'>Assignees</InputLabel>
        <Select
          labelId='assigneeSelect'
          id='demo-multiple-chip'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Assignees' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {employees.map((employee) => (
            <MenuItem
              key={employee.email}
              value={employee.email}
              // style={getStyles(employee.email, personName, theme)}
            >
              {employee.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default AssigneeSelect;
