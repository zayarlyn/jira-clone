import { lazy, Suspense as S, useState } from 'react';
import { Avatar, ChakraProvider as CP, Switch } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthUserQuery } from '../../api/auth.endpoint';
import IconBtn from '../util/IconBtn';
import { setTheme, Theme } from '../../utils';
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
    setTheme(mode);
  };

  const handleLogOut = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div className='flex shrink-0'>
      <div className='flex w-14 flex-col items-center justify-between bg-primary py-6'>
        <div className='flex flex-col gap-y-8'>
          <button title='Go to Home' onClick={() => navigate('/project')} className='w-8'>
            <img className='h-8 w-12' src='/assets/jira.svg' alt='jira-clone' />
          </button>
          <CP>
            <Switch title='Toggle Theme' isChecked={mode === 'dark'} onChange={handleToggle} />
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
              title='Profile'
            />
          </CP>
          <IconBtn onClick={handleLogOut} icon='charm:sign-out' title='Log Out' />
        </div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 320 : 0 }}
        transition={{ type: 'tween' }}
      >
        {authUser && (
          <S>
            <Profile authUser={authUser} />
          </S>
        )}
      </motion.div>
    </div>
  );
}

export default Sidebar;

async function logOut() {
  const result = await axiosDf.post('auth/logout');
  return result.data;
}
