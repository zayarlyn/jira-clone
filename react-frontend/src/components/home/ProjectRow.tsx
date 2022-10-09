import { Icon } from '@iconify/react';
import { lazy, Suspense as S, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../api/apiTypes';
import { usePublicUserQuery } from '../../api/endpoints/auth.endpoint';
import { selectMembers } from '../../api/endpoints/member.endpoint';
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
        className='group relative flex cursor-pointer border-y-2 border-c-3 border-t-transparent py-1 hover:border-t-2 hover:border-blue-400'
        onClick={() => navigate(id + '/board')}
      >
        <div className='w-8 shrink-0 text-center'>{idx + 1}</div>
        <div className='min-w-[10rem] grow px-2'>{name}</div>
        <div className='min-w-[18rem] grow px-2'>{descr}</div>
        <div className='w-52 shrink-0 px-2'>
          {publicUser?.username}
          {isAdmin ? <span className='ml-1 text-sm font-bold'>(you)</span> : ''}
        </div>
        <button
          title='Delete or Leave'
          onClick={handleDelete}
          className='btn-icon absolute right-0 ml-5 bg-c-1 group-hover:block sm:hidden'
        >
          <Icon icon='bx:trash' className='text-red-500' />
        </button>
      </div>
      {on && publicUser && (
        <S>
          <DeleteProject
            projectId={id}
            {...{ name, authUserId, memberId, isAdmin }}
            onClose={() => setOn(false)}
          />
        </S>
      )}
    </div>
  );
};

export default ProjectRow;
