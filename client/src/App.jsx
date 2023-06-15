import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeData from './components/employees/EmployeeData';
import ShowAllTasks from './components/tasks/ShowAllTasks';
import TasksData from './components/tasks/TasksData';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index path='/tasks' element={<TasksData />} />
        <Route path='/employees' element={<EmployeeData />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
