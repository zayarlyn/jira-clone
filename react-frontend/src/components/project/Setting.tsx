import { FieldError, FieldValues, useForm } from 'react-hook-form';
import InputWithValidation from '../util/InputWithValidation';
import MemberInput from './MemberInput';
import {
  selectCurrentProject,
  useUpdateProjectMutation,
} from '../../api/endpoints/project.endpoint';
import { useParams } from 'react-router-dom';
import { selectMembers } from '../../api/endpoints/member.endpoint';
import { selectAuthUser } from '../../api/endpoints/auth.endpoint';
import toast from 'react-hot-toast';

const Setting = () => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const projectId = Number(useParams().projectId);
  const { members } = selectMembers(projectId);
  const { authUser: u } = selectAuthUser();
  const { project } = selectCurrentProject(projectId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!project || !members || !u) return null;

  const { id, name, descr, repo } = project;
  const isAdmin = members.filter(({ userId: uid }) => uid === u.id)[0].isAdmin;

  const onSubmit = async (formData: FieldValues) => {
    if (formData.name === name && formData.descr === descr && formData.repo === repo) return;
    await updateProject({ id, ...formData });
    toast('Project setting updated');
  };

  return (
    <div className='mt-10 px-5 sm:px-10'>
      <h1 className='mb-4 text-xl font-semibold text-c-text'>Project Setting</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-[30rem] flex-col gap-4'>
        <InputWithValidation
          defaultValue={name}
          label='Name'
          placeholder='project name'
          register={register('name', {
            required: { value: true, message: 'name must not be empty' },
          })}
          error={errors.name as FieldError}
          darkEnabled
          readOnly={!isAdmin}
        />
        <InputWithValidation
          defaultValue={descr}
          label='Description'
          placeholder='project description'
          register={register('descr')}
          error={errors.descr as FieldError}
          darkEnabled
          readOnly={!isAdmin}
        />
        <InputWithValidation
          defaultValue={repo}
          label='Repository'
          placeholder='github repo link'
          register={register('repo')}
          error={errors.repo as FieldError}
          darkEnabled
          readOnly={!isAdmin}
        />
        <MemberInput members={members} projectId={id} readOnly={!isAdmin} />
        <div className='mt-2'>
          {!isAdmin && (
            <span className='block text-sm text-red-400'>
              * Only Admin can edit the project setting *
            </span>
          )}
          <button
            disabled={!isAdmin}
            className={`btn mt-3 ${!isAdmin ? 'pointer-event-none cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'saving changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
