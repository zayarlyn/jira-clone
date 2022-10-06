import { ChakraProvider as CP, Avatar } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { PublicUser } from '../../api/apiTypes';
import { useAddMemberMutation } from '../../api/member.endpoint';

interface Props extends PublicUser {
  added: boolean;
  projectId: number;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const UserMember = (props: Props) => {
  const { id, username, email, profileUrl, added, projectId, setInput } = props;
  const [addMember] = useAddMemberMutation();

  const handleAddMember = () => {
    addMember({ userId: id, projectId });
    setInput('');
  };

  return (
    <div
      onClick={handleAddMember}
      className='flex items-center rounded-sm bg-c-2 px-3 py-2 text-c-text hover:bg-c-6'
    >
      <CP>
        <Avatar size='sm' src={profileUrl} />
      </CP>
      <span className='mx-3'>{username}</span>
      <span className='ml-auto overflow-hidden truncate text-sm font-medium'>{email}</span>
      {added && <Icon className='ml-3' icon='teenyicons:tick-circle-outline' />}
    </div>
  );
};

export default UserMember;
