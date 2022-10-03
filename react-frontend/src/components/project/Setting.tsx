import { Button, ChakraProvider, Stack } from '@chakra-ui/react';
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';
import { Icon } from '@iconify/react';
import MemberInput from './MemberInput';
import { selectCurrentProject, useUpdateProjectMutation } from '../../api/project.endpoint';
import { useParams } from 'react-router-dom';

const Setting = () => {
  const { projectId } = useParams();

  const { project } = selectCurrentProject(Number(projectId));
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [updateProject] = useUpdateProjectMutation();

  if (!project) return null;

  const { id, name, descr, repo } = project;
  const onSubmit = (formData: FieldValues) => {
    if (formData.name === name && formData.descr === descr && formData.repo === repo) return;
    updateProject({ id, ...formData });
  };

  return (
    <ChakraProvider>
      <div className='mt-4 px-10'>
        <h1 className='mb-4 text-xl font-semibold text-c-text'>Project Setting</h1>
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
              darkEnabled
            />
            <InputWithValidation
              defaultValue={descr}
              label='Description'
              placeholder='project description'
              register={register('descr')}
              error={errors.descr as FieldError}
              darkEnabled
            />
            <InputWithValidation
              defaultValue={repo}
              label='Repository'
              placeholder='github repo link'
              register={register('repo')}
              error={errors.repo as FieldError}
              darkEnabled
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
