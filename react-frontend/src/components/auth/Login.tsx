import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axiosDf from '../../api/axios';
import Form from './Form';

const LogIn = () => {
  const {
    register,
    formState: { errors, isSubmitting: loading },
    handleSubmit,
  } = useForm();

  return (
    <div className='bg-white w-[22rem] rounded-md py-12 px-6'>
      <h3 className='text-center text-gray-800 font-medium text-3xl'>Welcome back</h3>
      <h4 className='text-center mb-5 text-[15px] text-gray-600'>Free for testing</h4>
      <Form type='LOGIN' onSubmit={logIn} {...{ errors, handleSubmit, register, loading }} />
      <div className='flex items-center'>
        <hr className='border-t-[.5px] grow border-gray-400' />
        <span className='text-center block my-3 bg-white w-fit px-2'>OR</span>
        <hr className='border-t-[.5px] grow border-gray-400' />
      </div>
      <Link to='/register'>
        <span className='text-center block text-blue-600 hover:underline'>Join now</span>
      </Link>
    </div>
  );
};

export default LogIn;

const logIn = async (body: FieldValues) => {
  const result = await axiosDf.post('auth/login', body);
  return result.data;
};
