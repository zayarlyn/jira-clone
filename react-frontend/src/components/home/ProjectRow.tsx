import { Icon } from '@iconify/react';
import { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../api/apiTypes';
import { usePublicUserQuery } from '../../api/auth.endpoint';
import { selectMembers } from '../../api/member.endpoint';
const DeleteProject = lazy(() => import('./DeleteProject'));

interface Props extends Project {
  idx: number;
  authUserId: number;
}

const ProjectRow = (props: Props) => {
  const { idx, id, name, descr, repo, userId, authUserId } = props;
  const { members } = selectMembers(id);
  const { data: publicUser } = usePublicUserQuery(userId);
  const [on, setOn] = useState(false);
  const navigate = useNavigate();

  if (!members) return null;

  const { isAdmin, id: memberId } = members.filter(({ userId: u }) => u === authUserId)[0];

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOn(true);
  };

  return (
    <div>
      <div
        key={id}
        className='flex border-c-3 border-y-2 relative group border-t-transparent py-1 cursor-pointer hover:border-blue-400 hover:border-t-2'
        onClick={() => navigate(id + '/board')}
      >
        <div className='text-center w-8 shrink-0'>{idx + 1}</div>
        <div className='grow min-w-[10rem] px-2'>{name}</div>
        <div className='grow min-w-[20rem] px-2'>{descr}</div>
        <div className='w-52 shrink-0 px-2'>
          {publicUser?.username}
          {isAdmin ? <span className='text-sm ml-1 font-bold'>(you)</span> : ''}
        </div>
        <button
          title='Delete or Leave'
          onClick={handleDelete}
          className='icon-btn ml-5 absolute right-0 bg-c-1 hidden group-hover:block'
        >
          <Icon icon='bx:trash' className='text-red-500' />
        </button>
      </div>
      {on && publicUser && (
        <Suspense>
          <DeleteProject
            projectId={id}
            {...{ name, authUserId, memberId, isAdmin }}
            onClose={() => setOn(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ProjectRow;
