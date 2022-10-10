import { Icon } from '@iconify/react';
import { PublicUser } from '../../api/apiTypes';
import { useAddMemberMutation } from '../../api/endpoints/member.endpoint';
import Avatar from '../util/Avatar';

interface Props extends PublicUser {
  added: boolean;
  projectId: number;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const UserMember = (props: Props) => {
  const { id, username, email, profileUrl, added, projectId, setInput } = props;
  const [addMember] = useAddMemberMutation();

  const handleAddMember = () => {
    if (added) return;
    addMember({ userId: id, projectId });
    setInput('');
  };

  return (
    <div
      onClick={handleAddMember}
      className={`flex items-center rounded-sm bg-c-2 px-3 py-2 text-c-text hover:bg-c-6  ${
        added ? 'pointer-events-none' : 'cursor-pointer'
      }`}
    >
      <Avatar src={profileUrl} name={username} />
      <span className='mx-3'>{username}</span>
      <span className='ml-auto overflow-hidden truncate text-sm font-medium'>{email}</span>
      {added && <Icon className='ml-3' icon='teenyicons:tick-circle-outline' />}
    </div>
  );
};

export default UserMember;
