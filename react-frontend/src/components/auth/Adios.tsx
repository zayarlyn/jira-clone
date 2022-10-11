import { FieldError, FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { AxiosError } from 'axios';
import InputWithValidation from '../util/InputWithValidation';
import { useAuthUserQuery } from '../../api/endpoints/auth.endpoint';
import { Navigate, useNavigate } from 'react-router-dom';
import { APIERROR } from '../../api/apiTypes';
import axiosDf from '../../api/axios';
import toast from 'react-hot-toast';

function Adios() {
  const {
    register,
    formState: { errors, isSubmitting: loading },
    handleSubmit,
  } = useForm();
  const { data: authUser, error } = useAuthUserQuery();
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  if (!authUser) return null;

  const name = authUser.username;

  const onSubmit = async (form: FieldValues) => {
    setSubmitError('');
    if (form.name.trim() !== name) return setSubmitError("the name doesn't match");
    try {
      await deleteACC(form);
      toast('Your account is deleted!');
      navigate('/login');
    } catch (error) {
      setSubmitError(((error as AxiosError).response?.data as APIERROR).message);
    }
  };

  return (
    <main className='bg-jira-gradient grid h-fit min-h-screen w-full place-items-center'>
      <div className='my-8 w-11/12 max-w-[25rem] rounded-md bg-white px-8 pt-12 pb-14'>
        <h1 className='text-xl'>You are about to delete your account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col gap-5'>
          <InputWithValidation
            label='Please enter your password'
            placeholder='account password'
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
          <div>
            <span className='text-sm'>
              Please type "<span className='text-blue-500'>{name}</span>" to confirm
            </span>
            <InputWithValidation
              label=''
              placeholder={name}
              register={register('name', {
                required: { value: true, message: 'please fill the box' },
              })}
              error={errors.name as FieldError}
              inputClass='border-gray-500'
            />
          </div>
          <div className='mt-2'>
            {submitError && <span className='text-red-500'>{submitError}</span>}
            <button className='btn mt-2 w-full'>
              {loading ? 'deleting ...' : 'Delete my account'}
            </button>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='btn-crystal mt-3 w-full bg-slate-200 hover:bg-slate-100'
            >
              go back
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Adios;

const deleteACC = async (body: FieldValues) => {
  const result = await axiosDf.post('api/user/authUser/delete', body, {
    withCredentials: true,
  });
  return result.data;
};
