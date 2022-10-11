import { lazy, memo, Suspense as S, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AuthUser } from '../../api/apiTypes';
import UpdateProfile from './UpdateProfile';
import Avatar from '../util/Avatar';
import { parseDate } from '../../utils';
const ChangePwd = lazy(() => import('./ChangePwd'));

interface Props {
  authUser: AuthUser;
}

const Profile = (props: Props) => {
  const { authUser: u } = props;
  const [isNormal, setIsNormal] = useState(true);

  return (
    <div className='flex h-screen w-[320px] flex-col items-center gap-8 overflow-y-auto overflow-x-hidden border-r-2 border-c-3 bg-c-1 p-6'>
      {u ? (
        <>
          <Avatar
            src={u.profileUrl}
            name={u.username}
            className='h-40 w-40 cursor-default text-6xl'
          />
          <div className='mb-2'>
            {isNormal ? (
              <UpdateProfile user={u} />
            ) : (
              <S>
                <ChangePwd />
              </S>
            )}
            <button
              onClick={() => setIsNormal((p) => !p)}
              className='mt-2 w-full rounded-sm py-1 text-center text-c-text underline hover:bg-c-6'
            >
              {isNormal ? 'Change password' : 'Go back'}
            </button>
          </div>
          <div className='mt-auto w-full text-sm text-c-5'>
            <span className='mb-1 block'>{'joined at ' + parseDate(u.createdAt)}</span>
            <span>{'last logged in ' + parseDate(u.lastLoggedIn)}</span>
            <Link to='/adios' className='btn-alert mt-3 block w-full text-center text-base'>
              Delete account
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default memo(Profile);
