import { FieldError, FieldValues, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import InputWithValidation from '../util/InputWithValidation';
import { useState } from 'react';

type APIERROR = { message: string };

function ChangePwd() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading, isSubmitSuccessful: success },
  } = useForm();
  const [error, setError] = useState('');

  const handleChangePwd = async (form: FieldValues) => {
    try {
      await changePwd(form);
      setError('');
    } catch (error) {
      setError(((error as AxiosError).response?.data as APIERROR).message);
    }
  };

  return (
    <>
      <h2 className='text-c-text-1 mt-10 text-2xl'>Change Password</h2>
      {success && !error ? (
        <div className='grid place-items-center font-semibold h-40 mt-5 text-c-text-1 text-xl text-center'>
          Password changed successfully 🚀
        </div>
      ) : (
        <>
          <div className='flex flex-col mt-5 gap-4 w-[16.5rem]'>
            <InputWithValidation
              label='Old password'
              placeholder='enter your old password'
              register={register('oldPwd', {
                required: { value: true, message: 'password must not be empty' },
              })}
              error={errors.oldPwd as FieldError}
              darkEnabled
            />
            <InputWithValidation
              label='New password'
              placeholder='enter your old password'
              register={register('newPwd', {
                required: { value: true, message: 'password must not be empty' },
                minLength: { value: 4, message: 'must be at least 4 characters long' },
                maxLength: { value: 14, message: 'must be under 15 characters' },
              })}
              error={errors.newPwd as FieldError}
              darkEnabled
            />
          </div>
          {error && <span className='text-red-400 block mt-4 text-left'>{error}</span>}
          <button onClick={handleSubmit(handleChangePwd)} className='btn w-full mt-8'>
            {loading ? 'proceeding ...' : 'Change'}
          </button>
        </>
      )}
    </>
  );
}

export default ChangePwd;

async function changePwd(body: FieldValues) {
  const result = await axios.put('http://localhost:5000/auth/changePwd', body, {
    withCredentials: true,
  });
  return result.data;
}
