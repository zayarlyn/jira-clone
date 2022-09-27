import { Avatar, ChakraProvider, Stack } from '@chakra-ui/react';
import { FieldError, useForm } from 'react-hook-form';
import { selectAuthUser } from '../api/auth.endpoint';
import InputWithValidation from './util/InputWithValidation';

const Profile = () => {
  const { authUser: u } = selectAuthUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className='w-[320px] bg-light-c-1 h-full p-6'>
      <ChakraProvider>
        <div className='flex justify-center my-3'>
          <Avatar src={u?.profileUrl} name={u?.username} w={40} h={40} />
        </div>
        <Stack spacing={4} mt={8}>
          <InputWithValidation
            label='Username'
            defaultValue={u?.username}
            register={register('username', {
              required: { value: true, message: 'username must not be empty' },
            })}
            error={errors.username as FieldError}
          />
          <InputWithValidation
            label='Email'
            defaultValue={u?.email}
            register={register('email', {
              required: { value: true, message: 'email must not be empty' },
            })}
            error={errors.email as FieldError}
          />
          <InputWithValidation
            label='Photo Url'
            defaultValue={u?.profileUrl}
            register={register('profileUrl')}
            error={errors.username as FieldError}
          />
        </Stack>
      </ChakraProvider>
    </div>
  );
};

export default Profile;
