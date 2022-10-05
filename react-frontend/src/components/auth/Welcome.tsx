import { lazy, Suspense } from 'react';
import { Icon } from '@iconify/react';
const LogIn = lazy(() => import('../auth/Login'));
const Register = lazy(() => import('../auth/Register'));

interface Props {
  type: 'LOGIN' | 'REGISTER';
}

const Welcome = (props: Props) => {
  const { type } = props;
  return (
    <div className='flex flex-col w-full items-center h-fit min-h-screen bg-gradient-to-r from-[#151642] to-[#321898]'>
      <div className='text-white tracking-wide w-11/12 mx-auto max-w-[40rem] my-16'>
        {/* <div className=''> */}
        <h1 className='lg:text-4xl text-xl sm:text-2xl font-medium lg:font-semibold text-center'>
          The #1 software development tool used by agile teams
        </h1>
        {/* <h2 className='font-semibold text-sm mt-10'>A FREE PLAN INCLUDES:</h2>
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
          </button> */}
        {/* </div> */}
      </div>
      <div className='mb-12 w-11/12 max-w-[24rem]'>
        <Suspense>{type === 'LOGIN' ? <LogIn /> : <Register />}</Suspense>
      </div>
    </div>
  );
};

export default Welcome;
