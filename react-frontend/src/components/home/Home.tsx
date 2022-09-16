import { Outlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
// import Dashboard from '../dashboard/Dashboard';
import Menubar from './Menubar';
import Sidebar from './Sidebar';

const Home = () => {
  return (
    <>
      <Sidebar />
      <Menubar />
      {/* <Dashboard /> */}
      <main className='z-10 bg-center bg-white overflow-auto grow'>
        <Breadcrumbs />
        <Outlet />
      </main>
    </>
  );
};

export default Home;
