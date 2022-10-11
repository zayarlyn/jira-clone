import { useRef } from 'react';
import toast from 'react-hot-toast';
import {
  useDeleteProjectMutation,
  useLeaveProjectMutation,
} from '../../api/endpoints/project.endpoint';

interface Props {
  name: string;
  projectId: number;
  authUserId: number;
  memberId: number;
  isAdmin: boolean;
  onClose: () => void;
}

function DeleteProject(props: Props) {
  const { name, projectId, authUserId, memberId, isAdmin, onClose } = props;
  const [deleteProject, { isLoading: dl }] = useDeleteProjectMutation();
  const [leaveProject, { isLoading: ll }] = useLeaveProjectMutation();
  const ref = useRef<HTMLInputElement | null>(null);

  const handleDelete = async () => {
    if (ref.current?.value.trim() !== name) return;
    await deleteProject(projectId);
    toast('Deleted the project!');
  };

  const handleLeave = async () => {
    await leaveProject({ memberId, projectId, userId: authUserId });
    toast('Leaved the project!');
  };

  return (
    <div className='top-full flex items-center justify-end border-b-[1px] p-2'>
      {isAdmin ? (
        <>
          <span>
            Please type "<span className='text-chakra-blue'>{name}</span>" to delete
          </span>
          <input
            placeholder='project name'
            className='ml-8 border-[1px] border-gray-300 bg-c-1 px-2 outline-none'
            ref={ref}
          />
        </>
      ) : null}
      <button
        onClick={isAdmin ? handleDelete : handleLeave}
        className='btn-alert ml-5 py-[3px] text-sm'
      >
        {isAdmin ? (dl ? 'deleting ...' : 'Delete') : ll ? 'leaving ...' : 'Leave'}
      </button>
      <button onClick={onClose} className='btn-icon ml-2 px-3 py-[3px] text-sm'>
        cancel
      </button>
    </div>
  );
}

export default DeleteProject;
