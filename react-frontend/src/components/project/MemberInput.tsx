import { ChangeEvent, lazy, memo, Suspense as S, useState } from 'react';
import { useRemoveMemberMutation } from '../../api/endpoints/member.endpoint';
import { Member, PublicUser } from '../../api/apiTypes';
import UserMember from './UserMember';
import axiosDf from '../../api/axios';
const ConfirmModel = lazy(() => import('../util/ConfirmModel'));

interface Props {
  members: Member[];
  projectId: number;
  readOnly?: boolean;
}

let unsubscribe: ReturnType<typeof setTimeout>;

const MemberInput = (props: Props) => {
  const { projectId, members, readOnly } = props;
  const [removeMember] = useRemoveMemberMutation();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const uname = members && members[selectedIdx as number]?.username;

  const handleRemoveMember = async () => {
    if (!selectedIdx || !members) return;
    const member = members[selectedIdx];
    removeMember({ projectId, memberId: member.id, userId: member.userId });
    setSelectedIdx(null);
    setIsOpen(false);
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
      <label className='text-sm tracking-wide text-c-5'>Members</label>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder='username'
        className={`mt-2 block w-full rounded-sm border-2 border-transparent bg-c-6 px-3 py-[3px] text-sm text-c-text outline-none duration-200 hover:bg-c-7 focus:border-chakra-blue focus:bg-c-1 ${
          readOnly ? 'pointer-events-none' : ''
        }`}
        readOnly={readOnly}
      />
      <div className='relative'>
        <div>
          <div className='mt-3 flex flex-wrap gap-x-1 gap-y-2'>
            {members
              ? members.map(({ username, id, isAdmin }, idx) => (
                  <div
                    key={id}
                    onClick={() => setSelectedIdx(isAdmin ? null : idx)}
                    className={`rounded-sm border-[1px] px-2 py-[1px] text-sm font-semibold tracking-wide  ${
                      isAdmin
                        ? 'bg-blue-500 text-white'
                        : 'cursor-pointer text-blue-400 hover:opacity-90'
                    } ${
                      selectedIdx === idx ? 'border-green-400 text-green-400' : 'border-blue-400'
                    } ${readOnly ? 'pointer-events-none' : ''}`}
                  >
                    {username + (isAdmin ? ' *' : '')}
                  </div>
                ))
              : 'loading ...'}
          </div>
          {selectedIdx && !readOnly && (
            <div className='mt-3 flex justify-end gap-x-3 border-t-[.5px] border-gray-400 pt-4'>
              <button
                onClick={() => setSelectedIdx(null)}
                className='btn bg-transparent text-[13px] tracking-wide text-c-text hover:bg-c-2'
              >
                cancel
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className='btn-alert text-[13px] tracking-wide'
              >
                Remove member
              </button>
            </div>
          )}
        </div>
        {!input ? null : (
          <div className='absolute top-0 z-10 w-full rounded-[3px] border-[1px] bg-c-1 bg-white p-[8px_12px_22px] text-c-text shadow-sm'>
            {loading ? (
              <span className='mt-2 block text-center'>searching ...</span>
            ) : users.length === 0 ? (
              <span className='mt-2 block text-center'>not user was found :(</span>
            ) : (
              <>
                <span className='mb-2 block text-sm'>Is this the one?</span>
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
        <S>
          <ConfirmModel
            msg={'remove ' + uname}
            onClose={() => setIsOpen(false)}
            onSubmit={handleRemoveMember}
            toastMsg={uname + ' is out from the project!'}
          />
        </S>
      )}
    </div>
  );
};

export default memo(MemberInput);

const searchUsers = async (q: string) => {
  const result = await axiosDf.get('api/user/search?q=' + q);
  return result.data;
};
