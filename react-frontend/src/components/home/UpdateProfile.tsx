import { FieldError, FieldValues, useForm } from 'react-hook-form';
import { AuthUser } from '../../api/apiTypes';
import { useUpdateAuthUserMutation } from '../../api/auth.endpoint';
import InputWithValidation from '../util/InputWithValidation';

function UpdateProfile({ user: u }: { user: AuthUser }) {
  const [updateAuthUser] = useUpdateAuthUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
  } = useForm();

  const handleUpdate = async (form: FieldValues) => {
    if (
      !u ||
      (form.username === u.username && form.email === u.email && form.profileUrl === u.profileUrl)
    )
      return;
    await updateAuthUser(form);
  };
  return (
    <>
      <div className='flex flex-col gap-4 mt-8 w-[16.5rem]'>
        <InputWithValidation
          label='Username'
          placeholder='username'
          defaultValue={u.username}
          register={register('username', {
            required: { value: true, message: 'username must not be empty' },
          })}
          error={errors.username as FieldError}
          darkEnabled
        />
        <InputWithValidation
          label='Email'
          placeholder='email'
          defaultValue={u.email}
          register={register('email', {
            required: { value: true, message: 'username must not be empty' },
          })}
          error={errors.email as FieldError}
          readOnly
          darkEnabled
        />
        <InputWithValidation
          label='Photo Url'
          placeholder='profile picture'
          defaultValue={u.profileUrl}
          register={register('profileUrl')}
          error={errors.profileUrl as FieldError}
          darkEnabled
        />
      </div>
      <button onClick={handleSubmit(handleUpdate)} className='btn w-full mt-10'>
        {loading ? 'saving ...' : 'Save Changes'}
      </button>
    </>
  );
}

export default UpdateProfile;
