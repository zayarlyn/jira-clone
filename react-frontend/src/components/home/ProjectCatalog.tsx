import { Button, ChakraProvider, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { APIERROR } from '../../api/apiTypes';
import { useProjectsQuery } from '../../api/project.endpoint';
import CreateProjectModel from './CreateProjectModel';
import ProjectRow from './ProjectRow';
import type { Theme } from '../../App';

const ProjectCatalog = () => {
  const { data: projects, error } = useProjectsQuery(11);
  const [isOpen, setIsOpen] = useState(false);

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  return (
    <>
      <div className='bg-c-1 text-c-6 w-full pt-12 px-10 z-10'>
        <div className='flex justify-between'>
          <span className='text-2xl tracking-wide font-semibold'>Projects</span>
          <ChakraProvider>
            <Button
              borderRadius={2}
              size='sm'
              ml={6}
              colorScheme='messenger'
              bgColor='#0052cc'
              fontWeight='normal'
              fontSize={15}
              onClick={() => setIsOpen(true)}
            >
              Create a Project
            </Button>
          </ChakraProvider>
        </div>
        <div className='mt-8'>
          <ChakraProvider>
            <InputGroup size='sm' minW={160} w={160}>
              <InputLeftElement children={<Icon width={20} icon='ant-design:search-outlined' />} />
              <Input size='sm' placeholder='Search projects'></Input>
            </InputGroup>
          </ChakraProvider>
        </div>
        <div className='flex mt-4 text-sm font-semibold py-1'>
          <div className='w-8'></div>
          <div className='grow px-2 '>Name</div>
          <div className='grow px-2'>Description</div>
          <div className='w-52 px-2'>Lead</div>
        </div>
        <div className='mt-1 border-b-2 border-c-4'>
          {projects?.map((data, i) => (
            <ProjectRow key={data.id} idx={i} {...data} />
          ))}
        </div>
      </div>
      {isOpen && <CreateProjectModel isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProjectCatalog;
