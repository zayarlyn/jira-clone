import { Avatar, Button, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { PublicUser } from "../../api/apiTypes";
import { useAddMemberMutation } from "../../api/member.endpoint";

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
    setInput("");
  };

  return (
    <Button
      onClick={handleAddMember}
      pointerEvents={added ? "none" : "auto"}
      justifyContent="start"
      alignItems="center"
      colorScheme="gray"
      rounded="sm"
      w="full"
      py={6}
      mb={1}
    >
      <Avatar size="sm" src={profileUrl} />
      <Text mx={3}>{username}</Text>
      <Text
        overflow="hidden"
        textOverflow="ellipsis"
        fontWeight={400}
        fontSize={14}
        ml="auto"
      >
        {email}
      </Text>
      {added && <Icon className="ml-3" icon="teenyicons:tick-circle-outline" />}
    </Button>
  );
};

export default UserMember;
