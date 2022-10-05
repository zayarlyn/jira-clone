import { Dispatch, lazy, SetStateAction, Suspense, useState } from 'react';
import {
  ChakraProvider as CP,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  AvatarGroup,
  Divider,
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
      <CP>
        <InputGroup size='sm' minW={160} w={160}>
          <InputLeftElement children={<IconIfy width={20} icon='ant-design:search-outlined' />} />
          <Input size='sm' placeholder='Search issues'></Input>
        </InputGroup>
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
      <Divider my={1} h={6} orientation='vertical' />
      {uid && (
        <button className='btn-crystal' onClick={handleSetQuery({})}>
          Clear all
        </button>
      )}
      <button onClick={handleClick} className='btn ml-5'>
        Create an issue
      </button>
      {isOpen && !isEmpty && (
        <Suspense>
          <IssueModelHOC children={CreateIssueModal} onClose={() => setIsOpen(false)} />
        </Suspense>
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
