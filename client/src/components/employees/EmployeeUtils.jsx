import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// Data for Data Table Component
export const columns = [
  { id: 'serialNumber', label: 'No.', minWidth: 15 },
  { id: 'fullName', label: 'Employee', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    minWidth: 120,
  },
  {
    id: 'dateOfBirth',
    label: 'Birth Date',
    minWidth: 100,
  },
  {
    id: 'monthlySalary',
    label: 'Monthly Salary',
    minWidth: 100,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
  },
];
const actions = (
  employee,
  { handleUpdateEmployee, deleteEmployeeMutation }
) => {
  return (
    <>
      <IconButton
        onClick={(e) => {
          handleUpdateEmployee(e, employee);
        }}
        color='primary'
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          deleteEmployeeMutation(employee._id);
        }}
        color='secondary'
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};
export const rows = (
  employees,
  { handleUpdateEmployee, deleteEmployeeMutation }
) => {
  return employees.map((employee, index) => {
    return {
      id: employee._id,
      serialNumber: index,
      fullName: employee.fullName,
      photo: employee?.photo || null,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      dateOfBirth: employee.dateOfBirth,
      monthlySalary: employee.monthlySalary,
      status: employee.status,
      actions: actions(employee, {
        handleUpdateEmployee,
        deleteEmployeeMutation,
      }),
    };
  });
};
