import { useRef } from 'react';
import { useDeleteProjectMutation, useLeaveProjectMutation } from '../../api/project.endpoint';

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

  const handleDelete = () => {
    if (ref.current?.value.trim() !== name) return;
    deleteProject(projectId);
  };

  const handleLeave = () => {
    leaveProject({ memberId, projectId, userId: authUserId });
  };

  return (
    <div className='top-full p-2 flex justify-end items-center border-b-[1px]'>
      {isAdmin ? (
        <>
          <span>
            Please type <span className='text-chakra-blue'>"{name}"</span> to delete
          </span>
          <input
            placeholder='project name'
            className='bg-c-1 outline-none border-[1px] border-gray-300 px-2 ml-8'
            ref={ref}
          />
        </>
      ) : null}
      <button
        onClick={isAdmin ? handleDelete : handleLeave}
        className='btn-alert text-sm py-[3px] ml-5'
      >
        {isAdmin ? (dl ? 'deleting ...' : 'Delete') : ll ? 'leaving ...' : 'Leave'}
      </button>
      <button onClick={onClose} className='icon-btn px-3 text-sm py-[3px] ml-2'>
        cancel
      </button>
    </div>
  );
}

export default DeleteProject;
