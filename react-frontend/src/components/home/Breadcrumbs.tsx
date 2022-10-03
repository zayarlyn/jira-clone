import { ChakraProvider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { useProjectQuery } from '../../api/project.endpoint';

const Breadcrumbs = () => {
  const location = useLocation();

  const fragments = location.pathname.slice(1).split('/');
  const { data: project } = useProjectQuery(Number(fragments[1]) ?? -1);

  return (
    <ChakraProvider>
      <div className='mt-8 mb-4 px-10 min-w-max'>
        <Breadcrumb
          className='text-c-text'
          spacing='8px'
          separator={<Icon className='inline text-xl' icon='ei:chevron-right' />}
        >
          {fragments[0] && (
            <BreadcrumbItem>
              <Link to='/project/' className='hover:underline'>
                project
              </Link>
            </BreadcrumbItem>
          )}

          {fragments[1] && (
            <BreadcrumbItem>
              <Link to={'/project/' + fragments[1]} className='hover:underline'>
                {project?.name ?? 'undefined'}
              </Link>
            </BreadcrumbItem>
          )}

          {fragments[2] && (
            <BreadcrumbItem isCurrentPage>
              <Link to={`/project/${fragments[1]}/board`} className='hover:underline'>
                Kanban board
              </Link>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </div>
    </ChakraProvider>
  );
};

export default Breadcrumbs;

// project/2/board
// project/2
// project
