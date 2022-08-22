import { Navigate, Route, Routes } from 'react-router-dom';
import Project from '../project/Project';
import Setting from '../project/Setting';
import Breadcrumbs from './Breadcrumbs';

const Dashboard = () => {
  return (
    <main className='z-10 bg-gray-500 overflow-auto grow'>
      <Breadcrumbs />
      <Routes>
        <Route path='/project/:projectId/kanban' element={<Project />} />
        <Route path='/project/:projectId' element={<Setting />} />
        <Route path='/' element={<Navigate to='project/1234' />} />
      </Routes>
    </main>
  );
};

export default Dashboard;
