import { useAuthUserQuery } from '../../api/auth.endpoint';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import type { CreateProject } from '../../api/apiTypes';
import { useCreateProjectMutation } from '../../api/project.endpoint';
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';
import Model from '../util/Model';

interface Props {
  onClose: () => void;
}

const CreateProjectModel = (props: Props) => {
  const { onClose } = props;
  const { data: authUser } = useAuthUserQuery();
  const [createProject] = useCreateProjectMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm();

  const handleCreateProject = async (form: FieldValues) => {
    if (!authUser) return;
    try {
      await createProject({ ...form, userId: authUser.id } as CreateProject);
      onClose();
    } catch (err) {}
  };

  return (
    <Model onSubmit={handleSubmit(handleCreateProject)} {...{ onClose, isLoading }}>
      <>
        <div className='mb-8'>
          <span className='font-[600] text-[22px] text-c-text'>Create Project</span>
        </div>
        <div className='flex flex-col gap-4'>
          <InputWithValidation
            label='Project name'
            placeholder='name of your project'
            register={register('name', {
              required: { value: true, message: 'Project name must not be empty' },
            })}
            error={errors.name as FieldError}
            autoFocus
          />
          <InputWithValidation
            label='Short description'
            placeholder='describe your project in a few words'
            register={register('descr')}
            error={errors.descr as FieldError}
          />
          <InputWithValidation
            label='Repository link'
            placeholder="link to the Project's repository"
            register={register('repo')}
            error={errors.repo as FieldError}
          />
        </div>
        {authUser && (
          <WithLabel label='Members'>
            <>
              <div className='bg-c-6 mb-2 py-1 px-3 text-sm border-[1px] rounded-sm border-gray-300 text-c-text'>
                <Item
                  text={authUser.username}
                  icon={authUser.profileUrl}
                  className='w-6 h-6 mr-4 rounded-full object-cover'
                />
              </div>
              <span className='text-sm text-c-text'>
                * you can add more members after creating the project *
              </span>
            </>
          </WithLabel>
        )}
      </>
    </Model>
  );
};

export default CreateProjectModel;
