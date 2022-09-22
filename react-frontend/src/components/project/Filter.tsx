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
import CreateIssueModel from '../issue/CreateIssueModel';
import IssueModelHOC from '../issue/IssueModelHOC';
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
    <div className='mb-8 flex min-w-fit items-center px-10'>
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
            Recently uploaded
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
          <IssueModelHOC size='fixed' render={CreateIssueModel} {...{ isOpen, setIsOpen }} />
        )}
      </ChakraProvider>
    </div>
  );
};

export default Filter;

const accounts = [
  {
    name: 'Jugram Haschwalth',
    src: 'https://i.pinimg.com/550x/6a/ba/57/6aba571046202190f7cee92fa0e2a036.jpg',
  },
  {
    name: 'Yhwach',
    src: 'http://img1.wikia.nocookie.net/__cb20150520013839/bleach/en/images/7/72/626Yhwach_reveals.png',
  },
  {
    name: 'As Nodt',
    src: 'https://pbs.twimg.com/media/E3UQWwZX0Ao9vBw.jpg',
  },
  {
    name: 'Bambietta Basterbine',
    src: 'https://i.pinimg.com/564x/38/d0/b3/38d0b3d24a5a235bd9cd40645b5b1e5d.jpg',
  },
];
