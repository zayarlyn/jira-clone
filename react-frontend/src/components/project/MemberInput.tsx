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
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleRemoveMember = () => {
    if (!selectedId) return;
    removeMember({ projectId, userId: selectedId });
    setSelectedId(null);
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
      <Text as='label' fontSize='sm'>
        Members
      </Text>
      <Input
        value={input}
        onChange={handleInputChange}
        size='sm'
        mt={1}
        variant='filled'
        placeholder='username or email'
      />
      <Box position='relative'>
        <Box>
          <Flex wrap='wrap' gap={1} mt={3}>
            {members
              ? members.map(({ username, id, isAdmin }) => (
                  <Badge
                    key={id}
                    variant={isAdmin ? 'solid' : 'outline'}
                    colorScheme={selectedId === id ? 'green' : 'blue'}
                    gap={1}
                    px={2}
                    py={1}
                    cursor='pointer'
                    _hover={{ color: 'Highlight' }}
                    onClick={() => setSelectedId((prev) => (isAdmin ? null : id))}
                  >
                    {username + (isAdmin ? ' *' : '')}
                  </Badge>
                ))
              : 'loading ...'}
          </Flex>
          {selectedId && (
            <>
              <hr className='border-t-[.5px] border-gray-400 mt-3' />
              <Flex justifyContent='right' mt={3}>
                <Button
                  onClick={() => setSelectedId(null)}
                  size='xs'
                  borderRadius={3}
                  variant='ghost'
                  mr={3}
                >
                  cancel
                </Button>
                <Button onClick={handleRemoveMember} size='xs' borderRadius={3} colorScheme='red'>
                  remove member
                </Button>
              </Flex>
            </>
          )}
        </Box>
        {!input ? null : (
          <Box
            position='absolute'
            zIndex={1}
            top={0}
            bgColor='white'
            w='full'
            shadow='sm'
            borderWidth={1}
            p='8px 12px 22px'
          >
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
                      {...info}
                      added={members?.some(({ userId }) => userId === info.id) ?? false}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
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
