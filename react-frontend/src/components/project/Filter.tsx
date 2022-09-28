import { Dispatch, SetStateAction, useState } from 'react';
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
} from '@chakra-ui/react';
import { Icon as IconIfy } from '@iconify/react';
import { useMembersQuery } from '../../api/member.endpoint';
import CreateIssueModal from '../issue/CreateIssueModal';
import IssueModalHOC from '../issue/IssueModalHOC';
import { APIERROR, IssueQuery } from '../../api/apiTypes';
import { Navigate } from 'react-router-dom';

interface Props {
  issueQueryData: Omit<IssueQuery, 'projectId'>;
  setIssueQueryData: Dispatch<SetStateAction<Omit<IssueQuery, 'projectId'>>>;
  projectId: number;
}

const Filter = (props: Props) => {
  const {
    issueQueryData: { userId: uid },
    setIssueQueryData,
    projectId,
  } = props;
  const { data: members, error } = useMembersQuery(projectId);
  const [isOpen, setIsOpen] = useState(false);

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
        <Button
          borderRadius={2}
          size='sm'
          ml={6}
          colorScheme='messenger'
          bgColor='#0052cc'
          fontWeight='normal'
          fontSize={15}
          onClick={() => setIsOpen(true)}
        >
          Create an issue
        </Button>
        {isOpen && (
          <IssueModalHOC size='fixed' render={CreateIssueModal} {...{ isOpen, setIsOpen }} />
        )}
      </ChakraProvider>
    </div>
  );
};

export default Filter;
