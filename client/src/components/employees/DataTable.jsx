import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import ShowTableRowLogic from './ShowTableRowLogic';
const DataTable = ({
  columns,
  rows,
  edit,
  setEdit,
  handleDateChange,
  handleChange,
  updateEmployeeMutation,
  formData,
  handleImageUpload,
}) => {
  const numberOfHighlightedRows = 5;
  const highlightRowColor = '#e7e7e7';
  // States and Handlers for Data Table Component
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Handler for updating Employee Data
  const handleUpdate = (id) => {
    updateEmployeeMutation({ ...formData, id: id });
    setEdit(false);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  <Typography variant='body' color='textSecondary'>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (row.email != undefined)
                  return (
                    <TableRow
                      role='checkbox'
                      tabIndex={-1}
                      key={row.email}
                      sx={{
                        bgcolor:
                          index < numberOfHighlightedRows
                            ? highlightRowColor
                            : 'inherit',
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            <ShowTableRowLogic
                              edit={edit}
                              column={column}
                              row={row}
                              value={value}
                              handleUpdate={handleUpdate}
                              handleDateChange={handleDateChange}
                              handleChange={handleChange}
                              setEdit={setEdit}
                              handleImageUpload={handleImageUpload}
                              formData={formData}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default DataTable;
