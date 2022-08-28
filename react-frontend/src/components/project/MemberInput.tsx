import { Badge, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import React, { memo } from 'react';
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
          ? members.map(({ username, id, isAdmin }) => (
              <Badge key={id} variant={isAdmin ? 'solid' : 'outline'} colorScheme='blue' gap={1}>
                {username + (isAdmin ? ' *' : '')}
              </Badge>
            ))
          : 'loading ...'}
      </Flex>
    </div>
  );
};

export default memo(MemberInput);
