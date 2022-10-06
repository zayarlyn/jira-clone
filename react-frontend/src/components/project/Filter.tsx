import { Dispatch, lazy, SetStateAction, Suspense as S, useState } from 'react';
import {
  ChakraProvider as CP,
  Avatar,
  AvatarGroup,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { Icon as IconIfy } from '@iconify/react';
import { useMembersQuery } from '../../api/member.endpoint';
import { APIERROR, IssueQuery } from '../../api/apiTypes';
import { Navigate } from 'react-router-dom';
import { useAuthUserQuery } from '../../api/auth.endpoint';
const IssueModelHOC = lazy(() => import('../issue/IssueModelHOC'));
const CreateIssueModal = lazy(() => import('../issue/CreateIssueModal'));

interface Props {
  issueQueryData: Omit<IssueQuery, 'projectId'>;
  setIssueQueryData: Dispatch<SetStateAction<Omit<IssueQuery, 'projectId'>>>;
  setIsDragDisabled: Dispatch<SetStateAction<boolean>>;
  projectId: number;
  isEmpty: boolean;
}

function Filter(props: Props) {
  const {
    issueQueryData: { userId: uid },
    setIssueQueryData,
    projectId,
    isEmpty,
    setIsDragDisabled,
  } = props;
  const { data: members, error } = useMembersQuery(projectId);
  const { data: authUser } = useAuthUserQuery();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  if (!authUser || !members) return null;

  function handleClick() {
    if (isEmpty) return toast(toastConfig);
    setIsOpen(true);
  }

  const handleSetQuery = (query: { userId?: number }) => () => {
    setIssueQueryData(query);
    setIsDragDisabled(!!query.userId);
  };

  return (
    <div className='mb-8 flex min-w-fit items-center px-10 text-c-5'>
      <div className='relative'>
        <input
          placeholder='Search issues'
          className='w-44 rounded-sm border-[1px] bg-transparent py-[5px] pl-8 pr-2 text-sm outline-none focus:border-chakra-blue'
        />
        <IconIfy
          width={20}
          icon='ant-design:search-outlined'
          className='absolute top-[6px] left-[6px] w-[19px]'
        />
      </div>
      <CP>
        <AvatarGroup ml={6} mr={4}>
          {members?.map(({ id, profileUrl, username, userId }) => (
            <Avatar
              key={id}
              name={username}
              title={username}
              src={profileUrl}
              h={'43px'}
              w={'43px'}
              cursor='pointer'
              transitionDuration='.2s'
              borderColor={userId === uid ? 'blue' : undefined}
              _hover={{ transform: 'translateY(-6px)' }}
              onClick={handleSetQuery({ userId })}
            />
          ))}
        </AvatarGroup>
      </CP>
      <button className='btn-crystal shrink-0' onClick={handleSetQuery({ userId: authUser.id })}>
        Only my issues
      </button>
      {uid && (
        <>
          <div className='pb-[2px]'>|</div>
          <button className='btn-crystal shrink-0' onClick={handleSetQuery({})}>
            Clear all
          </button>
        </>
      )}
      <button onClick={handleClick} className='btn ml-5 shrink-0'>
        Create an issue
      </button>
      {isOpen && !isEmpty && (
        <S>
          <IssueModelHOC children={CreateIssueModal} onClose={() => setIsOpen(false)} />
        </S>
      )}
    </div>
  );
}

export default Filter;

const toastConfig: UseToastOptions = {
  title: 'Please create a list before creating an issue',
  position: 'top-right',
  duration: 4000,
  isClosable: true,
};
