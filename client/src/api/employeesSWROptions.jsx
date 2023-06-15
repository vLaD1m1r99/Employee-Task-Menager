export const addEmployeeOptions = (newEmployee) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (employees) => [...employees, newEmployee],
    rollbackOnError: true,
    populateCache: (added, employees) => [...employees, added],
    revalidate: false,
  };
};

export const updateEmployeeOptions = (updatedEmployee) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (employees) => {
      const prevEmployees = employees.filter((employees) => {
        return employees._id !== updatedEmployee._id;
      });
      return [...prevEmployees, updatedEmployee].sort((a, b) => b.id - a.id);
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (updated, employees) => {
      const prevEmployee = employees.filter((employee) => {
        return employee._id !== updatedEmployee._id;
      });
      return [...prevEmployee, updated].sort((a, b) => b.id - a.id);
    },
    revalidate: false,
  };
};

export const deleteEmployeeOptions = ({ id }) => {
  return {
    // optimistic data displays until we populate cache
    // param is previous data
    optimisticData: (employees) => {
      return employees.filter((employee) => {
        return employee._id !== id;
      });
    },
    rollbackOnError: true,
    // response from API request is 1st param
    // previous data is 2nd param
    populateCache: (emptyResponseObj, employees) => {
      return employees.filter((employee) => {
        return employee._id !== id;
      });
    },
    revalidate: false,
  };
};
