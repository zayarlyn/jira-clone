import { Badge, Flex, Input, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { ProjectMember } from '../../api/apiTypes';
import { useMembersQuery } from '../../api/project.endpoint';

interface Props {
  projectId: number;
}

const MemberInput = ({ projectId }: Props) => {
  const { data: members } = useMembersQuery(projectId);

  return (
    <div>
      <Text as='label' fontSize='sm'>
        Members
      </Text>
      <Input defaultValue='' size='sm' mt={1} variant='filled' placeholder='add members by email' />
      <Flex wrap='wrap' gap={1} mt={3}>
        {members
          ? members.map(({ username, id }) => (
              <Badge key={id} variant='outline' colorScheme='blue'>
                {username}
              </Badge>
            ))
          : 'loading ...'}
      </Flex>
    </div>
  );
};

export default memo(MemberInput);
