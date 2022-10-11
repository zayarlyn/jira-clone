import { memo, useState } from 'react';
import toast from 'react-hot-toast';
import RTAutosize from 'react-textarea-autosize';
import { AuthUser } from '../../api/apiTypes';
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
  const [createCmt, { isLoading }] = useCreateCmtMutation();
  if (!u) return null;

  const len = descr.length;

  const handleCreateCmt = async () => {
    if (len > 200) return;
    await createCmt({ descr, userId: u.id, ...data });
    toast('Added comment!');
    setDescr('');
  };

  return (
    <div>
      <div className='relative mt-3 flex items-start gap-3'>
        <Avatar src={u.profileUrl} name={u.username} />
        <RTAutosize
          className='w-full resize-none rounded-[3px] border-[1.5px] border-slate-200 px-3 py-1 text-gray-800 outline-none hover:bg-[#f4f5f7] focus:border-chakra-blue'
          placeholder='Add a comment ...'
          value={descr}
          minRows={1}
          onChange={(e) => setDescr(e.target.value)}
        />
        {descr && (
          <span
            className={`absolute -bottom-[22px] right-0 text-sm italic ${
              len > 200 ? 'text-red-400' : 'text-gray-800'
            }`}
          >
            {len > 200 ? 'max length exceeded' : <>{200 - len} characters left</>}
          </span>
        )}
      </div>
      {descr && (
        <div className='mt-7 flex justify-end gap-1'>
          <button onClick={() => setDescr('')} className='btn-crystal hover:bg-slate-200'>
            cancel
          </button>
          <button onClick={handleCreateCmt} className='btn'>
            {isLoading ? 'adding...' : 'Add'}
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(AddComment);
