import { useAuthUserQuery } from '../../api/auth.endpoint';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import type { CreateProject } from '../../api/apiTypes';
import { useCreateProjectMutation } from '../../api/project.endpoint';
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';
import { motion } from 'framer-motion';

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
    formState: { errors, isSubmitting: loading },
  } = useForm();

  const handleCreateProject = async (form: FieldValues) => {
    if (!authUser) return;
    try {
      await createProject({ ...form, userId: authUser.id } as CreateProject);
      onClose();
    } catch (err) {}
  };

  return (
    <div className='fixed top-0 left-0 w-screen h-screen z-10'>
      <div onClick={onClose} className='bg-[#565c6340] w-full h-full' />
      <motion.div
        className='absolute w-[31rem] top-1/2 left-1/2 rounded-[4px] bg-c-1 p-6'
        initial={{ scale: 0.9, x: '-50%', y: '-50%' }}
        animate={{ scale: 1 }}
      >
        <div className='mb-8'>
          <span className='font-[600] text-[22px] text-c-text-1'>Create Project</span>
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
              <div className='bg-c-7 mb-2 py-[2px] px-3 text-sm border-[1px] rounded-sm border-gray-300 text-c-text-1'>
                <Item
                  text={authUser.username}
                  icon={authUser.profileUrl}
                  className='w-6 h-6 mr-4 rounded-full object-cover'
                />
              </div>
              <span className='text-sm text-c-text-1'>
                * you can add more members after creating the project *
              </span>
            </>
          </WithLabel>
        )}
        <div className='flex justify-end mt-8 gap-x-3'>
          <button onClick={onClose} className='px-3 py-1 rounded-[3px] text-c-text-1 hover:bg-c-4'>
            cancel
          </button>
          <button
            onClick={handleSubmit(handleCreateProject)}
            className='px-3 py-1 rounded-[3px] bg-blue-600 text-white hover:bg-blue-700'
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateProjectModel;
