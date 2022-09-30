import { useState } from 'react';
import { Avatar, ChakraProvider, Switch } from '@chakra-ui/react';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import IconBtn from '../util/IconBtn';
import { motion } from 'framer-motion';
import Profile from './Profile';
import type { Theme } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

function Sidebar(props: Props) {
  const {
    theme: { mode },
    toggleTheme,
  } = props;
  const { data: authUser } = useAuthUserQuery();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    toggleTheme();
    localStorage.setItem(
      'jira-clone-theme',
      JSON.stringify({
        mode: mode === 'light' ? 'dark' : 'light',
      })
    );
  };

  const handleLogOut = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div className='flex shrink-0'>
      <div className='flex flex-col justify-between items-center w-14 py-6 bg-primary'>
        <div className='flex flex-col gap-y-3'>
          <button onClick={() => navigate('/project')} className='w-8'>
            <img src='/assets/jira.svg' alt='jira-clone' />
          </button>
          <IconBtn icon='ant-design:search-outlined' />
          {/* <IconBtn icon='ant-design:plus-outlined' /> */}
          <ChakraProvider>
            <Switch isChecked={mode === 'dark'} onChange={handleToggle} />
          </ChakraProvider>
        </div>
        <div className='flex flex-col gap-6'>
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
          <IconBtn onClick={handleLogOut} icon='charm:sign-out' />
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
}

export default Sidebar;

async function logOut() {
  const result = await axios.post(
    'http://localhost:5000/auth/logout',
    {},
    {
      withCredentials: true,
    }
  );
  return result.data;
}
