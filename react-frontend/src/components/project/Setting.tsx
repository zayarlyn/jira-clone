import { Button, ChakraProvider, Stack } from '@chakra-ui/react';
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';
import { Icon } from '@iconify/react';
import MemberInput from './MemberInput';
import { selectProject } from '../../api/project.endpoint';

const Setting = () => {
  const { project } = selectProject(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  if (!project) return null;

  const { id, name, descr, repo, members } = project;
  const onSubmit = (formObj: FieldValues) => {
    // if (formObj.name === name && formObj.descr === descr && formObj.repo === repo) return;
  };

  return (
    <ChakraProvider>
      <div className='mt-8 px-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} maxW={480}>
            <InputWithValidation
              defaultValue={name}
              label='Name'
              placeholder='project name'
              register={register('name', {
                required: { value: true, message: 'name must not be empty' },
              })}
              error={errors.name as FieldError}
            />
            <InputWithValidation
              defaultValue={descr}
              label='Description'
              placeholder='project description'
              register={register('descr', {
                // required: { value: true, message: 'description must not be empty' },
              })}
              error={errors.descr as FieldError}
            />
            <InputWithValidation
              defaultValue={repo}
              label='Repository'
              placeholder='github repo link'
              register={register('repo', {
                // required: { value: true, message: 'description must not be empty' },
              })}
              error={errors.repo as FieldError}
            />
            <MemberInput projectId={id} />
          </Stack>
          <Button
            borderRadius={2}
            mt={8}
            type='submit'
            size='sm'
            colorScheme={isSubmitSuccessful ? 'facebook' : 'messenger'}
            rightIcon={isSubmitSuccessful ? <Icon icon='teenyicons:tick-solid' /> : undefined}
          >
            {isSubmitSuccessful ? 'Changes saved' : 'Save changes'}
          </Button>
        </form>
      </div>
    </ChakraProvider>
  );
};

export default Setting;
