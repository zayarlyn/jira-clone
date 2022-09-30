import { Badge, Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, memo, useState } from 'react';
import { PublicUser } from '../../api/apiTypes';
import { selectMembers, useRemoveMemberMutation } from '../../api/member.endpoint';
import UserMember from './UserMember';

interface Props {
  projectId: number;
}

let unsubscribe: NodeJS.Timeout;

const MemberInput = ({ projectId }: Props) => {
  const { members } = selectMembers(projectId);
  const [removeMember] = useRemoveMemberMutation();
  const [input, setInput] = useState('');
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleRemoveMember = () => {
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
      <Box position='relative'>
        <Box>
          <Flex wrap='wrap' gap={1} mt={3}>
            {members
              ? members.map(({ username, id, isAdmin }, idx) => (
                  <Badge
                    key={id}
                    variant={isAdmin ? 'solid' : 'outline'}
                    colorScheme={selectedIdx === id ? 'green' : 'blue'}
                    gap={1}
                    px={2}
                    py={1}
                    cursor='pointer'
                    _hover={{ color: 'Highlight' }}
                    onClick={() => setSelectedIdx(isAdmin ? null : idx)}
                  >
                    {username + (isAdmin ? ' *' : '')}
                  </Badge>
                ))
              : 'loading ...'}
          </Flex>
          {selectedIdx && (
            <>
              <div className='pt-4 flex justify-end gap-x-3 border-t-[.5px] border-gray-400 mt-3'>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className='btn text-[13px] tracking-wide bg-transparent hover:bg-c-2 text-c-text-1'
                >
                  cancel
                </button>
                <button
                  onClick={handleRemoveMember}
                  className='btn text-[13px] tracking-wide bg-red-500 hover:bg-red-600'
                >
                  Remove member
                </button>
              </div>
            </>
          )}
        </Box>
        {!input ? null : (
          <div className='absolute top-0 bg-white w-full shadow-sm p-[8px_12px_22px] z-10 border-[1px]'>
            {loading ? (
              <Text textAlign='center' mt={2}>
                searching ...
              </Text>
            ) : users.length === 0 ? (
              <Text textAlign='center' mt={2}>
                not user was found :(
              </Text>
            ) : (
              <>
                <Text fontSize={13} mb={2}>
                  Is this the one?
                </Text>
                <Box>
                  {users.map((info) => (
                    <UserMember
                      key={info.id}
                      projectId={projectId}
                      setInput={setInput}
                      added={members?.some(({ userId }) => userId === info.id) ?? false}
                      {...info}
                    />
                  ))}
                </Box>
              </>
            )}
          </div>
        )}
      </Box>
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
