import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useProjectQuery } from '../../api/endpoints/project.endpoint';

const Breadcrumbs = () => {
  const location = useLocation();
  const fragments = location.pathname.slice(1).split('/');
  const { data: project } = useProjectQuery(Number(fragments[1]) ?? -1);

  return (
    <div className='mt-8 mb-4 min-w-max px-8 text-c-text sm:px-10'>
      <Link to='/project' className='hover:underline'>
        project
      </Link>
      {fragments[1] && (
        <>
          <Icon className='mx-2 inline text-xl' icon='ei:chevron-right' />
          <Link to={'/project/' + fragments[1]} className='hover:underline'>
            {project?.name ?? 'undefined'}
          </Link>
        </>
      )}
      {fragments[2] && (
        <>
          <Icon className='mx-2 inline text-xl' icon='ei:chevron-right' />
          <Link to={`/project/${fragments[1]}/board`} className='hover:underline'>
            Kanban board
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
