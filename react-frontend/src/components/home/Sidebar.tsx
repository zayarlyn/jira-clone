import { Avatar, ChakraProvider } from '@chakra-ui/react';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import IconBtn from '../util/IconBtn';

const Sidebar = () => {
  const { data: authUser } = useAuthUserQuery();

  return (
    <div className='flex w-14 shrink-0 flex-col items-center justify-between bg-light-c-4 py-6'>
      <div className='flex flex-col gap-y-3'>
        <button className='w-8'>
          <img src='/assets/jira.svg' alt='jira-clone' />
        </button>
        <IconBtn icon='ant-design:search-outlined' />
        <IconBtn icon='ant-design:plus-outlined' />
      </div>
      <div className='flex flex-col gap-3'>
        <ChakraProvider>
          <Avatar
            src={authUser?.profileUrl}
            name={authUser?.username}
            size='sm'
            cursor='pointer'
            border='1px solid white'
            _hover={{ borderColor: 'tomato' }}
          />
        </ChakraProvider>
        <IconBtn icon='ep:question-filled' />
      </div>
    </div>
  );
};

export default Sidebar;
