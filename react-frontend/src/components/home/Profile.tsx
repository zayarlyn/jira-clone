import { Avatar, ChakraProvider as CP } from '@chakra-ui/react';
import { lazy, memo, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AuthUser } from '../../api/apiTypes';
import UpdateProfile from './UpdateProfile';
const ChangePwd = lazy(() => import('./ChangePwd'));

interface Props {
  authUser: AuthUser;
}

const Profile = (props: Props) => {
  const { authUser: u } = props;
  const [isNormal, setIsNormal] = useState(true);

  return (
    <div className='w-[320px] overflow-y-auto overflow-x-hidden flex flex-col items-center bg-c-1 border-r-2 border-c-3 h-full p-6'>
      {u ? (
        <>
          <CP>
            <Avatar src={u?.profileUrl} name={u?.username} w={40} h={40} />
          </CP>
          {isNormal ? (
            <UpdateProfile user={u} />
          ) : (
            <Suspense>
              <ChangePwd />
            </Suspense>
          )}
          <button
            onClick={() => setIsNormal((p) => !p)}
            className='text-center text-c-text underline mt-5'
          >
            {isNormal ? 'Change password' : 'Go back'}
          </button>
          <div className='mt-auto w-full text-c-5'>
            <Metadata text='Last logged In' date={u.lastLoggedIn} />
            <Metadata text='Joined At' date={u.createdAt} />
          </div>
          <Link to='/adios' className='btn-alert w-full mt-3 text-center'>
            Delete account
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default memo(Profile);

const Metadata = ({ text, date }: { text: string; date: string }) => (
  <span className='block'>
    {text}
    <span className='tracking-wide font-semibold ml-3'>{new Date(date).toLocaleDateString()}</span>
  </span>
);
