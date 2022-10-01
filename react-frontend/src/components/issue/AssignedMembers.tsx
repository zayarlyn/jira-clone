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

  return (
    <ChakraProvider>
      <AvatarGroup size='sm'>
        {assignees.map(({ id, userId }) => {
          const assignee = membersObj[userId];

          return assignee ? (
            <Avatar key={id} name={assignee.username} src={assignee.profileUrl} />
          ) : null;
        })}
      </AvatarGroup>
    </ChakraProvider>
  );
};

export default memo(AssignedMembers);
