import { Outlet, useOutlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Menubar from './Menubar';
import ProjectCatalog from './ProjectCatalog';
import Sidebar from './Sidebar';

const Home = () => {
  const outlet = useOutlet();

  return (
    <>
      <Sidebar />
      <Menubar />
      {outlet ? (
        <>
          <main className='z-10 bg-center bg-white overflow-auto grow'>
            <Breadcrumbs />
            <Outlet />
          </main>
        </>
      ) : (
        <ProjectCatalog />
      )}
    </>
  );
};

export default Home;
