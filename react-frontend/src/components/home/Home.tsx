import { Outlet, useOutlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Menubar from './Menubar';
import ProjectCatalog from './ProjectCatalog';
import Sidebar from './Sidebar';
import type { Theme } from '../../utils';

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

const Home = (props: Props) => {
  const outlet = useOutlet();

  return (
    <>
      <Sidebar {...props} />
      <Menubar />
      {outlet ? (
        <>
          <main className='z-10 h-screen grow overflow-auto bg-c-1 bg-center'>
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
