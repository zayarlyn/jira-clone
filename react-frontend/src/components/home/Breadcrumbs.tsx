import { ChakraProvider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const Breadcrumbs = () => {
  return (
    <ChakraProvider>
      <div className='mt-8 px-10 min-w-max'>
        <Breadcrumb className='text-light-c-3'  spacing='8px' separator={<Icon className='inline text-xl' icon='ei:chevron-right' />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/project'>project</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='/project/pid'>Bleach: TYBW</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='/project/pid/smoeth'>Kanban board</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </ChakraProvider>
  );
};

export default Breadcrumbs;
