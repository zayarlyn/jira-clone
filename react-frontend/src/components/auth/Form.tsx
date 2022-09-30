import { ChakraProvider, Input, useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputWithValidation from '../util/InputWithValidation';
import WithLabel from '../util/WithLabel';

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  onSubmit: (body: {}) => Promise<any>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  type: 'LOGIN' | 'SIGNUP';
}

type APIERROR = { message: string };

function Form(props: Props) {
  const { register, onSubmit, handleSubmit, errors, type } = props;
  const navigate = useNavigate();
  const toast = useToast();

  const submit = handleSubmit(async (form) => {
    try {
      await onSubmit(form);
      // navigate('/project');
      window.location.replace('http://localhost:3000/project');
    } catch (error) {
      const err = (error as AxiosError).response?.data as APIERROR;
      toast({
        title: 'Authentication error',
        description: err.message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: null,
      });
    }
  });

  return (
    <form onSubmit={submit}>
      <div className='flex flex-col gap-y-4'>
        <InputWithValidation
          label='Email'
          register={register('email', {
            required: { value: true, message: 'email must not be empty' },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'please provide a valid email',
            },
          })}
          autoFocus
          darkEnabled={false}
          error={errors.email as FieldError}
        />
        {type === 'SIGNUP' && (
          <InputWithValidation
            label='Username'
            register={register('username', {
              required: { value: true, message: 'username must not be empty' },
              minLength: { value: 2, message: 'must be at least two characters long' },
              pattern: { value: /^[A_Za-z0-9_]+$/, message: 'username can be a-z,A-Z,0-9,_' },
            })}
            darkEnabled={false}
            error={errors.username as FieldError}
          />
        )}
        <InputWithValidation
          label='Password'
          register={register('pwd', {
            required: { value: true, message: 'password must not be empty' },
            minLength: { value: 4, message: 'must be at least 4 characters long' },
            maxLength: { value: 14, message: 'must be under 15 characters' },
          })}
          darkEnabled={false}
          error={errors.pwd as FieldError}
        />
      </div>
      <hr className='border-t-[.5px] border-gray-400 mt-3' />
      <span className='text-[12px] text-gray-600 block mt-6'>
        By clicking below, you agree to the our
        <span className='text-blue-800'> Privacy Policy.</span>
      </span>
      <button type='submit' className='btn w-full mt-4 py-2 bg-[#321898]'>
        {type === 'SIGNUP' ? 'Join now' : 'Log In'}
      </button>
    </form>
  );
}

export default Form;

const ErrorMsg = ({ msg }: { msg: string }) => (
  <span className='text-[13px] text-red-500'>{msg}</span>
);
