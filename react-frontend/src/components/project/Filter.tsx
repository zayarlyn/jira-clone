import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  ChakraProvider,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Divider,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { Icon as IconIfy } from '@iconify/react';
import { useMembersQuery } from '../../api/member.endpoint';
import CreateIssueModal from '../issue/CreateIssueModal';
// import IssueModalHOC from '../issue/IssueModelHOC';
import { APIERROR, IssueQuery } from '../../api/apiTypes';
import { Navigate } from 'react-router-dom';
import IssueModelHOC from '../issue/IssueModelHOC';

interface Props {
  issueQueryData: Omit<IssueQuery, 'projectId'>;
  setIssueQueryData: Dispatch<SetStateAction<Omit<IssueQuery, 'projectId'>>>;
  projectId: number;
  isEmpty: boolean;
}

function Filter(props: Props) {
  const {
    issueQueryData: { userId: uid },
    setIssueQueryData,
    projectId,
    isEmpty,
  } = props;
  const { data: members, error } = useMembersQuery(projectId);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  function handleClick() {
    setIsOpen(true);
    if (isEmpty) toast(toastConfig);
  }

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;
  return (
    <div className='mb-8 flex min-w-fit items-center px-10 text-c-6'>
      <ChakraProvider>
        <InputGroup size='sm' minW={160} w={160}>
          <InputLeftElement children={<IconIfy width={20} icon='ant-design:search-outlined' />} />
          <Input size='sm' placeholder='Search issues'></Input>
        </InputGroup>
        <AvatarGroup ml={6} mr={4}>
          {members?.map(({ id, profileUrl, username, userId }) => (
            <Avatar
              key={id}
              name={username}
              src={profileUrl}
              h={'43px'}
              w={'43px'}
              cursor='pointer'
              transitionDuration='.2s'
              borderColor={userId === uid ? 'blue' : undefined}
              _hover={{ transform: 'translateY(-6px)' }}
              onClick={() => setIssueQueryData({ userId })}
            />
          ))}
        </AvatarGroup>
        <ButtonGroup size='sm' variant='ghost'>
          <Button fontWeight='normal' fontSize={15}>
            Only my issues
          </Button>
          <Button fontWeight='normal' fontSize={15}>
            Completed Issue
          </Button>
          <Divider my={1} h={6} orientation='vertical' />
          {uid && (
            <Button fontWeight='normal' fontSize={15} onClick={() => setIssueQueryData({})}>
              Clear all
            </Button>
          )}
        </ButtonGroup>
        <button onClick={handleClick} className='btn ml-5'>
          Create an issue
        </button>
        {isOpen && !isEmpty && (
          <IssueModelHOC children={CreateIssueModal} onClose={() => setIsOpen(false)} />
        )}
      </ChakraProvider>
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
