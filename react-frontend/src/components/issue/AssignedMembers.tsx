import { memo } from 'react';
import { Assignee, Member } from '../../api/apiTypes';
import Avatar from '../util/Avatar';

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
  const len = members.length;

  return (
    <div className='ml-7 flex'>
      {assignees.map(({ userId }, i) => {
        const assignee = membersObj[userId];
        return assignee ? (
          <Avatar
            key={userId}
            src={assignee.profileUrl}
            name={assignee.username}
            className={`pointer-events-none -ml-2 h-8 w-8 border-2 ${'z-' + (len - i) * 10}`}
          />
        ) : null;
      })}
    </div>
  );
};

export default memo(AssignedMembers);
