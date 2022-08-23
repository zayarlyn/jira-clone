import { Button, ChakraProvider, Input, Select, Stack, Text } from '@chakra-ui/react';
import { FieldError, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';

const Setting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <ChakraProvider>
      <div className='mt-8 px-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} maxW={480}>
            <InputWithValidation
              label='Name'
              error={errors.projectName as FieldError}
              placeholder='project name'
              register={register('projectName', {
                required: { value: true, message: 'name must not be empty' },
              })}
            />
            <InputWithValidation
              label='Description'
              error={errors.descr as FieldError}
              placeholder='project description'
              register={register('descr', {
                required: { value: true, message: 'description must not be empty' },
              })}
            />{' '}
            <InputWithValidation
              label='Repository'
              error={errors.repoLink as FieldError}
              placeholder='github repo link'
              register={register('repoLink', {
                required: { value: true, message: 'description must not be empty' },
              })}
            />
          </Stack>
          <Button mt={8} type='submit' size='sm' colorScheme='messenger'>
            Save changes
          </Button>
        </form>
      </div>
    </ChakraProvider>
  );
};

export default Setting;
