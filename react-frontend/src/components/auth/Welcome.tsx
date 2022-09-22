import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';

interface Props {
  children: () => JSX.Element;
}

const Welcome = (props: Props) => {
  const { children: Component } = props;
  return (
    <div className='flex w-full items-center h-sreen min-h-fit bg-gradient-to-r from-[#151642] to-[#321898]'>
      <div className='w-1/2 text-white tracking-wide'>
        <div className='w-8/12 mx-auto'>
          <h1 className='text-5xl font-semibold'>
            The #1 software development tool used by agile teams
          </h1>
          <h2 className='font-semibold text-sm mt-10'>A FREE PLAN INCLUDES:</h2>
          <ol className='list-disc list-inside flex flex-col gap-4 mt-4 text-gray-200'>
            <li>Supports up to 3 projects</li>
            <li>5 collaborator for each project</li>
            <li>Unlimited issues and updates</li>
          </ol>
          <button className='border-2 px-4 py-1 mt-9 group hover:border-dashed rounded-md flex items-center'>
            <span>Go to demo</span>
            <Icon
              className='ml-2 duration-300 group-hover:translate-x-3'
              width={25}
              icon='bi:arrow-right-short'
            />
          </button>
        </div>
      </div>
      <div className='w-1/2'>
        <Component />
      </div>
    </div>
  );
};

export default Welcome;
