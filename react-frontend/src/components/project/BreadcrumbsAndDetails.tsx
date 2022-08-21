import { ChakraProvider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const BreadcrumbsAndDetails = () => {
  return (
    <ChakraProvider>
      <div className='mt-8 px-10'>
        <Breadcrumb className='text-light-c-3' spacing='8px' separator={<Icon className='inline' icon='ei:chevron-right' />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='#'>About</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className='font-semibold text-xl text-light-c-3 mb-4 mt-7'>Kanban Board</h1>
      </div>
    </ChakraProvider>
  );
};

export default BreadcrumbsAndDetails;
