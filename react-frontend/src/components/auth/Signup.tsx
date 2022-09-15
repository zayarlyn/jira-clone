import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Form from './Form';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = handleSubmit((form) => {
    // api post request
  });

  return (
    <div className='bg-light-c-1 w-[22rem] rounded-md py-12 px-6'>
      <h3 className='text-center text-gray-800 font-medium text-3xl'>Get Started</h3>
      <h4 className='text-center mb-5 text-[15px] text-gray-600'>Free for testing</h4>
      <Form type='SIGNUP' register={register} errors={errors} onSubmit={handleSignUp} />
      <div className='flex items-center'>
        <hr className='border-t-[.5px] grow border-gray-400' />
        <span className='text-center block my-3 bg-white w-fit px-2'>OR</span>
        <hr className='border-t-[.5px] grow border-gray-400' />
      </div>
      <Link to='/login'>
        <span className='text-center block text-blue-600 hover:underline'>Log In</span>
      </Link>
    </div>
  );
};

export default Signup;
