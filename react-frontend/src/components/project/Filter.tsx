import { Dispatch, lazy, SetStateAction, Suspense as S, useState } from 'react';
import { APIERROR } from '../../api/apiTypes';
import { Navigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useMembersQuery } from '../../api/endpoints/member.endpoint';
import { useAuthUserQuery } from '../../api/endpoints/auth.endpoint';
import { useProjectQuery } from '../../api/endpoints/project.endpoint';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setIssueQuery } from '../../store/slices/querySlice';
import Avatar from '../util/Avatar';
import toast from 'react-hot-toast';
const IssueModelHOC = lazy(() => import('../issue/IssueModelHOC'));
const CreateIssueModal = lazy(() => import('../issue/CreateIssueModal'));

interface Props {
  setIsDragDisabled: Dispatch<SetStateAction<boolean>>;
  projectId: number;
  isEmpty: boolean;
}

function Filter(props: Props) {
  const { projectId, isEmpty, setIsDragDisabled } = props;
  const { data: m, error } = useMembersQuery(projectId);
  const { data: pj } = useProjectQuery(projectId);
  const { data: u } = useAuthUserQuery();
  const { userId: uid } = useAppSelector((s) => s.query.issue);
  const [on, setOn] = useState(false);
  const dispatch = useAppDispatch();
  const [fold, setFold] = useState(true);
  const len = m?.length;

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  function handleClick() {
    if (isEmpty) return toast.error('Please create a list first!');
    setOn(true);
  }

  const handleSetQuery = (query: { userId?: number }) => () => {
    dispatch(setIssueQuery(query));
    setIsDragDisabled(!!query.userId);
  };

  return (
    <div className='mb-8 flex min-w-fit items-center text-c-5'>
      <div className='relative'>
        <input
          placeholder='Search issues'
          className='w-44 rounded-sm border-[1.5px] bg-transparent py-[5px] pl-9 pr-2 text-sm outline-none focus:border-chakra-blue'
        />
        <Icon
          width={20}
          icon='ant-design:search-outlined'
          className='absolute top-[6px] left-2 w-[19px]'
        />
      </div>
      {m && len && (
        <div className='ml-7 mr-1 flex'>
          {(len > 4 && fold ? m.slice(0, 4) : m).map(({ profileUrl, username, userId }, i) => (
            <Avatar
              key={userId}
              src={profileUrl}
              name={username}
              style={{ zIndex: len - i }}
              onClick={handleSetQuery({ userId })}
              className={`-ml-2 h-11 w-11 border-2 duration-300 hover:-translate-y-2 ${
                userId === uid ? 'border-blue-500' : ''
              }`}
            />
          ))}
          {len > 4 && fold && (
            <button
              onClick={() => setFold(false)}
              className='-ml-2 grid h-11 w-11 items-center rounded-full bg-c-2 pl-2 hover:bg-c-3'
            >
              {len - 4}+
            </button>
          )}
        </div>
      )}
      {u && (
        <button className='btn-crystal shrink-0' onClick={handleSetQuery({ userId: u.id })}>
          Only my issues
        </button>
      )}
      {uid && (
        <>
          <div className='pb-[2px]'>|</div>
          <button className='btn-crystal shrink-0' onClick={handleSetQuery({})}>
            Clear all
          </button>
        </>
      )}
      <button onClick={handleClick} className='btn peer relative mx-5 shrink-0'>
        Create an issue
      </button>
      {pj && pj.repo && (
        <button
          title='go to github'
          onClick={() => window.open(pj.repo as string, '_blank')}
          className='ml-auto flex shrink-0 items-center gap-2 rounded-[3px] bg-c-2 py-1 px-3 hover:bg-c-6'
        >
          <Icon icon='bxl:github' />
          GitHub Repo
        </button>
      )}
      {on && !isEmpty && (
        <S>
          <IssueModelHOC children={CreateIssueModal} onClose={() => setOn(false)} />
        </S>
      )}
    </div>
  );
}

export default Filter;
