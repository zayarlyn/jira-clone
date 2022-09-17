import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Form from './Form';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className='bg-light-c-1 w-[22rem] rounded-md py-12 px-6'>
      <h3 className='text-center text-gray-800 font-medium text-3xl'>Get Started</h3>
      <h4 className='text-center mb-5 text-[15px] text-gray-600'>Free for testing</h4>
      <Form type='SIGNUP' onSubmit={registerUser} {...{ errors, handleSubmit, register }} />
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

export default Register;

const registerUser = async (body: {}) => {
  const result = await axios.post('http://localhost:5000/auth/register', body, {
    withCredentials: true,
  });
  return result.data;
};
