import { Badge, Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, memo, useState } from 'react';
import { SearchedUser } from '../../api/apiTypes';
import { selectMembers, useRemoveMemberMutation } from '../../api/project.endpoint';
import UserMember from './UserMember';

interface Props {
  projectId: number;
}

let unsubscribe: NodeJS.Timeout;

const MemberInput = ({ projectId }: Props) => {
  const { members } = selectMembers(projectId);
  const [removeMember] = useRemoveMemberMutation();
  const [input, setInput] = useState('');
  const [users, setUsers] = useState<SearchedUser[]>([]);
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
            <Flex justifyContent='right' mt={3}>
              <Button onClick={handleRemoveMember} size='xs' borderRadius={3} colorScheme='red'>
                remove member
              </Button>
              <Button
                onClick={() => setSelectedId(null)}
                size='xs'
                borderRadius={3}
                variant='ghost'
                ml={3}
              >
                cancel
              </Button>
            </Flex>
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
                not found :(
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
                      added={members?.some(({ id }) => id === info.id) ?? false}
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
  const result = await axios.get('http://localhost:5000/api/user/search?q=' + q);
  return result.data;
};
