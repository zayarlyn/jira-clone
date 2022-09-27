import { useState, lazy, Suspense } from 'react';
import { Avatar, ChakraProvider } from '@chakra-ui/react';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import IconBtn from '../util/IconBtn';
import { motion } from 'framer-motion';
import Profile from '../Profile';

const Sidebar = () => {
  const { data: authUser } = useAuthUserQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex shrink-0'>
      <div className='flex flex-col justify-between items-center w-14 py-6 bg-light-c-4'>
        <div className='flex flex-col gap-y-3'>
          <button className='w-8'>
            <img src='/assets/jira.svg' alt='jira-clone' />
          </button>
          <IconBtn icon='ant-design:search-outlined' />
          <IconBtn icon='ant-design:plus-outlined' />
        </div>
        <div className='flex flex-col gap-3 '>
          <ChakraProvider>
            <Avatar
              src={authUser?.profileUrl}
              name={authUser?.username}
              size='sm'
              cursor='pointer'
              border='1px solid white'
              _hover={{ borderColor: 'tomato' }}
              onClick={() => setIsOpen((p) => !p)}
            />
          </ChakraProvider>
          {/* <IconBtn icon='ep:question-filled' /> */}
        </div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 320 : 0 }}
        transition={{ type: 'tween' }}
      >
        <Profile />
      </motion.div>
    </div>
  );
};

export default Sidebar;
