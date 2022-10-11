import { lazy, Suspense as S, useState } from 'react';
import Avatar from '../util/Avatar';
import type { AuthUser, Comment as COMMENT } from '../../api/apiTypes';
import { useDeleteCmtMutation } from '../../api/endpoints/comment.endpoint';
import { parseDate } from '../../utils';
const ConfirmModel = lazy(() => import('../util/ConfirmModel'));

interface Props extends COMMENT {
  u: AuthUser;
  projectId: number;
}

function Comment(props: Props) {
  const { username, descr, profileUrl, createdAt, u, userId, id, projectId } = props;
  const [on, setOn] = useState(false);
  const [deleteCmt] = useDeleteCmtMutation();
  const isMine = u.id === userId;

  return (
    <>
      <li className='mb-6 flex items-start gap-3'>
        <Avatar src={profileUrl} name={username} className='mt-1 h-7 w-7' />
        <div className='grow'>
          <div className='flex justify-between text-sm'>
            <span className='font-semibold'>{username + (isMine ? ' (you)' : '')}</span>
            <span className='ml-3 text-gray-700'>{parseDate(createdAt)}</span>
          </div>
          <span className='block text-gray-800'>{descr}</span>
          {isMine && (
            <button
              onClick={() => setOn(true)}
              className='text-sm tracking-wide text-gray-700 hover:underline'
            >
              Delete
            </button>
          )}
        </div>
      </li>
      {on && (
        <S>
          <ConfirmModel
            onClose={() => setOn(false)}
            onSubmit={() => deleteCmt({ id, projectId })}
            toastMsg='Deleted a comment!'
          />
        </S>
      )}
    </>
  );
}

export default Comment;
