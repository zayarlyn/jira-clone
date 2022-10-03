import { lazy, useState } from 'react';
import { Avatar, ChakraProvider as CP, Switch } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import IconBtn from '../util/IconBtn';
import type { Theme } from '../../utils';
import { APIERROR } from '../../api/apiTypes';
import axiosDf from '../../api/axios';
const Profile = lazy(() => import('./Profile'));

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

function Sidebar(props: Props) {
  const {
    theme: { mode },
    toggleTheme,
  } = props;
  const { data: authUser, error } = useAuthUserQuery();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

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
          <CP>
            <Switch isChecked={mode === 'dark'} onChange={handleToggle} />
          </CP>
        </div>
        <div className='flex flex-col gap-6'>
          <CP>
            <Avatar
              src={authUser?.profileUrl}
              name={authUser?.username}
              size='sm'
              cursor='pointer'
              border='1px solid white'
              _hover={{ borderColor: 'tomato' }}
              onClick={() => setIsOpen((p) => !p)}
            />
          </CP>
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
  const result = await axiosDf.post('auth/logout');
  return result.data;
}
