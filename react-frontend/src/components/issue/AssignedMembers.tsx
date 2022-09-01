import { Avatar, AvatarGroup, ChakraProvider } from '@chakra-ui/react';
import { memo } from 'react';
import { Assignee, Member } from '../../api/apiTypes';

interface Props {
  assignees: Assignee[];
  members: Member[];
}

const AssignedMembers = (props: Props) => {
  const { members, assignees } = props;
  const membersObj = members.reduce(
    (p, { id, userId, ...data }) => ({ ...p, [userId]: data }),
    {}
  ) as Record<number, Member>;
  console.log(membersObj, assignees);

  return (
    <ChakraProvider>
      <AvatarGroup size='sm'>
        {assignees.map(({ id, userId }) => {
          const { username, profileUrl } = membersObj[userId];
          return <Avatar key={id} name={username} src={profileUrl} />;
        })}
      </AvatarGroup>
    </ChakraProvider>
  );
};

export default memo(AssignedMembers);
