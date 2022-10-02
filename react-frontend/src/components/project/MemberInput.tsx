import { ChangeEvent, lazy, memo, Suspense, useState } from 'react';
import axios from 'axios';
import { selectMembers, useRemoveMemberMutation } from '../../api/member.endpoint';
import { PublicUser } from '../../api/apiTypes';
import UserMember from './UserMember';
const ConfirmModel = lazy(() => import('../util/ConfirmModel'));

interface Props {
  projectId: number;
}

let unsubscribe: NodeJS.Timeout;

const MemberInput = ({ projectId }: Props) => {
  const { members } = selectMembers(projectId);
  const [removeMember] = useRemoveMemberMutation();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveMember = async () => {
    if (!selectedIdx || !members) return;
    const member = members[selectedIdx];
    removeMember({ projectId, memberId: member.id, userId: member.userId });
    setSelectedIdx(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(unsubscribe);
    const q = e.target.value;
    setInput(q);
    if (!q) return setUsers([]);
    setLoading(true);
    unsubscribe = setTimeout(async () => {
      setUsers(await searchUsers(q));
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <label className='text-sm tracking-wide text-c-6'>Members</label>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder='username'
        className='block w-full focus:border-chakra-blue mt-2 px-3 rounded-sm text-sm py-[3px] border-2 duration-200 outline-none border-transparent hover:bg-c-8 focus:bg-c-1 bg-c-7 text-c-text-1'
      />
      <div className='relative'>
        <div>
          <div className='flex flex-wrap gap-1 mt-3'>
            {members
              ? members.map(({ username, id, isAdmin }, idx) => (
                  <div
                    key={id}
                    onClick={() => setSelectedIdx(isAdmin ? null : idx)}
                    className={`px-2 tracking-wide font-semibold text-sm border-[1px]  ${
                      isAdmin
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-400 hover:opacity-90 cursor-pointer'
                    } ${
                      selectedIdx === idx ? 'border-green-400 text-green-400' : 'border-blue-400'
                    }`}
                  >
                    {username + (isAdmin ? ' *' : '')}
                  </div>
                ))
              : 'loading ...'}
          </div>
          {selectedIdx && (
            <div className='pt-4 flex justify-end gap-x-3 border-t-[.5px] border-gray-400 mt-3'>
              <button
                onClick={() => setSelectedIdx(null)}
                className='btn text-[13px] tracking-wide bg-transparent hover:bg-c-2 text-c-text-1'
              >
                cancel
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className='btn text-[13px] tracking-wide bg-red-500 hover:bg-red-600'
              >
                Remove member
              </button>
            </div>
          )}
        </div>
        {!input ? null : (
          <div className='absolute top-0 rounded-[3px] bg-white w-full shadow-sm p-[8px_12px_22px] z-10 border-[1px]'>
            {loading ? (
              <span className='text-center block mt-2'>searching ...</span>
            ) : users.length === 0 ? (
              <span className='text-center block mt-2'>not user was found :(</span>
            ) : (
              <>
                <span className='text-sm mb-2 block'>Is this the one?</span>
                {users.map((info) => (
                  <UserMember
                    key={info.id}
                    projectId={projectId}
                    setInput={setInput}
                    added={members?.some(({ userId }) => userId === info.id) ?? false}
                    {...info}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {isOpen && (
        <Suspense fallback={null}>
          <ConfirmModel
            msg={'remove ' + members?.[selectedIdx as number].username}
            onClose={() => setIsOpen(false)}
            onSubmit={handleRemoveMember}
          />
        </Suspense>
      )}
    </div>
  );
};

export default memo(MemberInput);

const searchUsers = async (q: string) => {
  const result = await axios.get('http://localhost:5000/api/user/search?q=' + q, {
    withCredentials: true,
  });
  return result.data;
};
