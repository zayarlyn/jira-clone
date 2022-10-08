import { memo, useState } from 'react';
import RTAutosize from 'react-textarea-autosize';
import { AuthUser } from '../../api/apiTypes';
import { selectAuthUser } from '../../api/endpoints/auth.endpoint';
import { useCreateCmtMutation } from '../../api/endpoints/comment.endpoint';
import Avatar from '../util/Avatar';

interface Props {
  u: AuthUser;
  issueId: number;
  projectId: number;
}

function AddComment(props: Props) {
  const { u, ...data } = props;
  const [descr, setDescr] = useState('');
  const [createCmt] = useCreateCmtMutation();
  if (!u) return null;

  const handleCreateCmt = () => {
    createCmt({ descr, userId: u.id, ...data });
    setDescr('');
  };

  return (
    <div>
      <div className='mt-3 flex items-start gap-3'>
        <Avatar src={u.profileUrl} name={u.username} />
        <RTAutosize
          className='w-full resize-none rounded-[3px] border-[1.5px] border-slate-200 px-3 py-1 text-gray-800 outline-none hover:bg-[#f4f5f7] focus:border-chakra-blue'
          placeholder='Add a comment ...'
          value={descr}
          minRows={1}
          onChange={(e) => setDescr(e.target.value)}
        />
      </div>
      {descr && (
        <div className='mt-2 flex justify-end gap-1'>
          <button onClick={() => setDescr('')} className='btn-crystal hover:bg-slate-200'>
            cancel
          </button>
          <button onClick={handleCreateCmt} className='btn'>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(AddComment);
