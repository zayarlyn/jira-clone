import { AxiosError } from 'axios';
import { useState } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { APIERROR } from '../../api/apiTypes';
import InputWithValidation from '../util/InputWithValidation';

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  onSubmit: (body: FieldValues) => Promise<any>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  type: 'LOGIN' | 'SIGNUP';
  loading: boolean;
}

function Form(props: Props) {
  const { register, onSubmit, handleSubmit, errors, loading, type } = props;
  const [error, setError] = useState('');

  const submit = handleSubmit(async (form) => {
    try {
      await onSubmit(form);
      toast(type === 'LOGIN' ? 'You have logged in!' : 'Your account is created!');
      window.location.replace('https://jira-replica.vercel.app/project'); //with refresh
    } catch (error) {
      setError(((error as AxiosError).response?.data as APIERROR).message);
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
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'please provide a valid email',
            },
          })}
          error={errors.email as FieldError}
          inputClass='border-gray-500'
          autoFocus
        />
        {type === 'SIGNUP' && (
          <InputWithValidation
            label='Username'
            register={register('username', {
              required: { value: true, message: 'username must not be empty' },
              minLength: {
                value: 2,
                message: 'must be at least two characters long',
              },
              pattern: {
                value: /^[A-Za-z0-9_]+$/g,
                message: 'username can be a-z,A-Z,0-9,_',
              },
            })}
            error={errors.username as FieldError}
            inputClass='border-gray-500'
          />
        )}
        <InputWithValidation
          label='Password'
          register={register('pwd', {
            required: { value: true, message: 'password must not be empty' },
            minLength: {
              value: 4,
              message: 'must be at least 4 characters long',
            },
            maxLength: { value: 14, message: 'must be under 15 characters' },
          })}
          error={errors.pwd as FieldError}
          inputClass='border-gray-500'
          type='password'
        />
      </div>
      {error && <span className='mt-3 block text-red-400'>{error}</span>}
      <hr className='mt-3 border-t-[.5px] border-gray-400' />
      <span className='mt-6 block text-[12px] text-gray-600'>
        By clicking below, you agree to the our
        <span className='text-blue-800'> Privacy Policy.</span>
      </span>
      <button type='submit' className='btn mt-4 w-full bg-[#321898] py-2'>
        {type === 'SIGNUP'
          ? loading
            ? 'registering ...'
            : 'Join now'
          : loading
          ? 'logging in ...'
          : 'Log In'}
      </button>
    </form>
  );
}

export default Form;
