import { lazy, Suspense } from 'react';
const LogIn = lazy(() => import('../auth/Login'));
const Register = lazy(() => import('../auth/Register'));

interface Props {
  type: 'LOGIN' | 'REGISTER';
}

const Welcome = (props: Props) => {
  const { type } = props;
  return (
    <div className='bg-jira-gradient flex flex-col w-full items-center h-fit min-h-screen'>
      <div className='text-white tracking-wide w-11/12 mx-auto max-w-[40rem] my-16'>
        <h1 className='lg:text-4xl text-xl sm:text-2xl font-medium lg:font-semibold text-center'>
          The #1 software development tool used by agile teams
        </h1>
      </div>
      <div className='mb-12 w-11/12 max-w-[24rem]'>
        <Suspense fallback={<div className='text-center'>a moment...</div>}>
          {type === 'LOGIN' ? <LogIn /> : <Register />}
        </Suspense>
      </div>
    </div>
  );
};

export default Welcome;
