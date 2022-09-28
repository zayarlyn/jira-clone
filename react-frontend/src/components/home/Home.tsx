import { Outlet, useOutlet } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Menubar from './Menubar';
import ProjectCatalog from './ProjectCatalog';
import Sidebar from './Sidebar';
import type { Theme } from '../../App';

interface Props {
  toggleTheme: () => void;
}

const Home = (props: Props) => {
  const { toggleTheme } = props;
  const outlet = useOutlet();

  return (
    <>
      <Sidebar toggleTheme={toggleTheme} />
      <Menubar />
      {outlet ? (
        <>
          <main className='z-10 bg-center bg-c-9 overflow-auto grow'>
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
