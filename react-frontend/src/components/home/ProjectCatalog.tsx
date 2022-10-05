import { ChakraProvider as CP, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { APIERROR } from '../../api/apiTypes';
import { selectAuthUser } from '../../api/auth.endpoint';
import { useProjectsQuery } from '../../api/project.endpoint';
import CreateProjectModel from './CreateProjectModel';
import ProjectRow from './ProjectRow';

const ProjectCatalog = () => {
  const { authUser } = selectAuthUser();
  const {
    data: projects,
    error,
    isLoading,
  } = useProjectsQuery(authUser?.id as number, { skip: !authUser });
  const [isOpen, setIsOpen] = useState(false);

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  if (isLoading)
    return (
      <div className='bg-white text-xl z-10 w-full grid place-items-center'>
        Fetching your projects 🚀
      </div>
    );

  if (!authUser) return null;

  return (
    <>
      <div className='bg-c-1 pb-10 grow overflow-auto text-c-5 h-screen min-h-fit pt-12 px-10 z-10'>
        <div className='flex justify-between gap-10'>
          <span className='text-2xl tracking-wide font-semibold'>Projects</span>
          <button onClick={() => setIsOpen(true)} className='btn'>
            Create Project
          </button>
        </div>
        <div className='mt-8'>
          <CP>
            <InputGroup size='sm' minW={160} w={160}>
              <InputLeftElement children={<Icon width={20} icon='ant-design:search-outlined' />} />
              <Input size='sm' placeholder='Search projects'></Input>
            </InputGroup>
          </CP>
        </div>
        <div className='min-w-fit'>
          <div className='flex mt-4 text-sm font-semibold py-1'>
            <div className='w-8 shrink-0'></div>
            <div className='grow px-2 min-w-[10rem]'>Name</div>
            <div className='grow px-2 min-w-[20rem]'>Description</div>
            <div className='w-52 px-2 shrink-0'>Lead</div>
          </div>
          {projects ? (
            projects.length !== 0 ? (
              <div className='mt-1 border-t-2 border-c-3'>
                {projects.map((data, i) => (
                  <ProjectRow key={data.id} idx={i} authUserId={authUser.id} {...data} />
                ))}
              </div>
            ) : (
              <div className='text-3xl grid place-items-center mt-[30vh]'>
                You haven't created any project yet!! 🚀
              </div>
            )
          ) : null}
        </div>
      </div>
      {isOpen && <CreateProjectModel onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProjectCatalog;
