import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LinearProgress, Typography } from '@mui/material';

import { rows, columns } from './EmployeeUtils';
import useSWR from 'swr';

import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  UrlEndpoint as cacheKey,
} from '../../api/employeesApi';

import {
  addEmployeeOptions,
  updateEmployeeOptions,
  deleteEmployeeOptions,
} from '../../api/employeesSWROptions';
import DataTable from './DataTable';
import EmployeeForm from './EmployeeForm';
import EmployeeMenager from './EmployeeMenager';

const ShowAllEmployees = () => {
  const [open, setOpen] = useState(false);

  const initialEditState = {
    validation: false,
    id: null,
  };
  const [edit, setEdit] = useState(initialEditState);

  // Data for add and edit forms
  const initialState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    monthlySalary: '',
    dateOfBirth: new Date(),
  };
  const [formData, setFormData] = useState(initialState);

  //   Setting up SWR
  const {
    isLoading,
    error,
    data: employees,
    mutate,
  } = useSWR(cacheKey, getAllEmployees, {
    onSuccess: (data) => data.sort((a, b) => b._id - a._id),
  });
  const addEmployeeMutation = async (newEmployee) => {
    try {
      await mutate(addEmployee(newEmployee), addEmployeeOptions(newEmployee));
      toast.success('Success! Added new item.', {
        duration: 1000,
        icon: '🎉',
      });
    } catch (err) {
      toast.error('Failed to add the new item.', {
        duration: 1000,
      });
    }
  };

  const updateEmployeeMutation = async (updatedEmployee) => {
    try {
      await mutate(
        updateEmployee(updatedEmployee),
        updateEmployeeOptions(updatedEmployee)
      );

      toast.success('Success! Updated item.', {
        duration: 1000,
        icon: '🚀',
      });
    } catch (err) {
      toast.error('Failed to update the item.', {
        duration: 1000,
      });
    }
  };

  const deleteEmployeeMutation = async (id) => {
    try {
      await mutate(deleteEmployee({ id }), deleteEmployeeOptions({ id }));

      toast.success('Success! Deleted item.', {
        duration: 1000,
      });
    } catch (err) {
      toast.error('Failed to delete the item.', {
        duration: 1000,
      });
    }
  };

  const handleAddNewEmployee = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleUpdateEmployee = (e, employee) => {
    e.preventDefault();
    setEdit({
      validation: true,
      email: employee.email,
    });
    setFormData(employee);
  };
  //   Handler for Date change
  const handleDateChange = (newValue) => {
    newValue.toISOString();
    setFormData({ ...formData, dateOfBirth: newValue });
  };
  // Handler for other Inputs change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  // Handler for Image Inputs
  const convertToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const base64 = await convertToBase64(image);
    setFormData({ ...formData, photo: base64 });
  };
  //   Handler for form opener
  const handleClose = () => {
    setOpen(false);
  };
  //   Handler for adding new Employee
  const handleSubmit = (event) => {
    event.preventDefault();
    addEmployeeMutation(formData);
    handleClose();
  };

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
    content = (
      <DataTable
        columns={columns}
        rows={rows(employees, { handleUpdateEmployee, deleteEmployeeMutation })}
        edit={edit}
        setEdit={setEdit}
        handleDateChange={handleDateChange}
        handleChange={handleChange}
        updateEmployeeMutation={updateEmployeeMutation}
        formData={formData}
        handleImageUpload={handleImageUpload}
      />
    );
  }
  return (
    <main>
      <Toaster toastOptions={{ position: 'top-center' }} />
      <EmployeeForm
        open={open}
        handleClose={handleClose}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        handleImageUpload={handleImageUpload}
      />
      <EmployeeMenager
        content={content}
        handleAddNewEmployee={handleAddNewEmployee}
      />
    </main>
  );
};
export default ShowAllEmployees;
