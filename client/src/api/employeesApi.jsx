import axios from 'axios';

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const UrlEndpoint = '/employees';

export const getAllEmployees = async () => {
  await delay();
  const response = await API.get(UrlEndpoint);
  return response.data;
};

export const addEmployee = async (employee) => {
  await delay();
  const response = await API.post(UrlEndpoint, employee);
  return response.data.employee;
};

export const updateEmployee = async (employee) => {
  await delay();
  const response = await API.patch(`${UrlEndpoint}/${employee.id}`, employee);
  return response.data.employee;
};

export const deleteEmployee = async ({ id }) => {
  await delay();
  const response = await API.delete(`${UrlEndpoint}/${id}`);
  return response.data;
};
