import { Button, ChakraProvider, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useProjectsQuery } from '../../api/project.endpoint';

const ProjectCatalog = () => {
  const { data: projects } = useProjectsQuery(11);
  const navigate = useNavigate();

  return (
    <div className='bg-white w-full pt-12 px-10'>
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
            // onClick={() => setIsOpen(true)}
          >
            Create a Project
          </Button>
        </ChakraProvider>
      </div>
      <div className='mt-8'>
        <ChakraProvider>
          <InputGroup size='sm' minW={160} w={160}>
            <InputLeftElement children={<Icon width={20} icon='ant-design:search-outlined' />} />
            <Input size='sm' placeholder='Search issues'></Input>
          </InputGroup>
        </ChakraProvider>
      </div>
      <div className='flex mt-4 text-sm font-semibold py-1'>
        <div className='w-8'></div>
        <div className='grow px-2 '>Name</div>
        <div className='grow px-2'>Description</div>
        <div className='w-32 px-2'>Lead</div>
      </div>
      <div className='mt-1'>
        {projects?.map(({ id, name, descr, repo, userId }, i) => (
          <div
            key={id}
            className='flex border-y-2 py-1 -mt-[2px] cursor-pointer hover:border-blue-400'
            onClick={() => navigate(id + '/board')}
          >
            <div className='text-center w-8'>{i + 1}</div>
            <div className='grow px-2'>{name}</div>
            <div className='grow px-2'>{descr}</div>
            <div className='w-32 px-2'>{userId}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCatalog;
