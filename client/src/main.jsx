import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { preload } from 'swr';
import { getAllEmployees, UrlEndpoint as cacheKey } from './api/employeesApi';
preload(cacheKey, getAllEmployees);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
