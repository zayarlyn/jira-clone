import { Assignee, Member } from '../../api/apiTypes';
import Avatar from '../util/Avatar';
import { memo } from 'react';

interface Props {
  assignees: Assignee[];
  members: Member[];
}

const AssignedMembers = (props: Props) => {
  const { members, assignees: ass } = props;
  const membersObj = members.reduce(
    (p, { id, userId, ...data }) => ({ ...p, [userId]: data }),
    {}
  ) as Record<number, Member>;
  const len = ass.length;

  return (
    <div className='ml-7 flex'>
      {(len > 2 ? ass.slice(0, 2) : ass).map(({ userId }, i) => {
        const u = membersObj[userId];
        return u ? (
          <Avatar
            key={userId}
            src={u.profileUrl}
            name={u.username}
            style={{ zIndex: len - i }}
            className='pointer-events-none -ml-2 h-7 w-7 border-2'
          />
        ) : null;
      })}
      {len > 2 && (
        <div className='-ml-2 grid h-7 w-7 items-center rounded-full bg-c-2 pl-[10px] text-[12px]'>
          {len - 2}+
        </div>
      )}
    </div>
  );
};

export default memo(AssignedMembers);
