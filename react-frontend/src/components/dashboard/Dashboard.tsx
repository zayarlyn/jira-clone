import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Project from '../project/Project';
import Setting from '../project/Setting';
import Breadcrumbs from '../home/Breadcrumbs';
// bg-[url(https://images.unsplash.com/photo-1657857285379-b6bc135b6105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)]
const Dashboard = () => {
  return (
    <main className='z-10 bg-center bg-white overflow-auto grow'>
      <Breadcrumbs />
      <Outlet />
    </main>
  );
};

export default Dashboard;
