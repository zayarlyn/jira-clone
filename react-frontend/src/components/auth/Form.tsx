import { Button, ChakraProvider, Input } from '@chakra-ui/react';
import { FieldErrorsImpl, FieldValues, FormState, useForm, UseFormRegister } from 'react-hook-form';
import FormWithLabel from '../util/FormWithLabel';

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  type: 'LOGIN' | 'SIGNUP';
}

const Form = (props: Props) => {
  const { register, onSubmit, errors, type } = props;

  return (
    <form onSubmit={onSubmit}>
      <ChakraProvider>
        <FormWithLabel label='Email' labelClass='text-[14px]'>
          <>
            <Input
              {...register('email', {
                required: { value: true, message: 'must not be empty' },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: 'please provide a valid email',
                },
              })}
              size='sm'
              borderColor='gray'
              border='1.5px solid'
            />
            {errors.email && <ErrorMsg msg={errors.email.message as string} />}
          </>
        </FormWithLabel>
        {type === 'SIGNUP' && (
          <FormWithLabel label='Username' labelClass='text-[14px]'>
            <>
              <Input
                {...register('username', {
                  required: { value: true, message: 'must not be empty' },
                  minLength: { value: 2, message: 'must be at least two characters long' },
                  pattern: { value: /^[A_Za-z0-9_]+$/, message: 'username can be a-z,A-Z,0-9,_' },
                })}
                size='sm'
                border='1.5px solid'
                borderColor='gray'
              />
              {errors.username && <ErrorMsg msg={errors.username.message as string} />}
            </>
          </FormWithLabel>
        )}
        <FormWithLabel label='Password' labelClass='text-[14px]'>
          <>
            <Input
              {...register('pwd', {
                required: { value: true, message: 'must not be empty' },
                minLength: { value: 4, message: 'must be at least 4 characters long' },
                maxLength: { value: 14, message: 'must be under 15 characters' },
              })}
              size='sm'
              border='1.5px solid'
              borderColor='gray'
            />
            {errors.pwd && <ErrorMsg msg={errors.pwd.message as string} />}
          </>
        </FormWithLabel>
        <hr className='border-t-[.5px] border-gray-400' />
        <span className='text-[12px] text-gray-600 block mt-6'>
          By clicking below, you agree to the our
          <span className='text-blue-800'> Privacy Policy.</span>
        </span>
        <Button
          type='submit'
          size='sm'
          width='full'
          colorScheme='blue'
          color='white'
          bgColor='#321898'
          borderRadius={3}
          mt={6}
          py={5}
        >
          {type === 'SIGNUP' ? 'Join now' : 'Log In'}
        </Button>
      </ChakraProvider>
    </form>
  );
};

export default Form;

const ErrorMsg = ({ msg }: { msg: string }) => (
  <span className='text-[13px] text-red-500'>{msg}</span>
);
