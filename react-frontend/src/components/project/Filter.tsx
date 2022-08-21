import {
  ChakraProvider,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  AvatarGroup,
  useStyleConfig,
} from '@chakra-ui/react';
import type { ComponentStyleConfig } from '@chakra-ui/react';
import { Icon as IconIfy } from '@iconify/react';

const Filter = () => {
  return (
    <ChakraProvider>
      <div className='my-8 flex items-center px-6'>
        <InputGroup size='sm' width={140}>
          <InputLeftElement children={<IconIfy width={20} icon='ant-design:search-outlined' />} />
          <Input size='sm' placeholder='Search issues'></Input>
        </InputGroup>
        <AvatarGroup>
          <Avatar
            name='Jugram Haschwalth'
            src='https://i.pinimg.com/550x/6a/ba/57/6aba571046202190f7cee92fa0e2a036.jpg'
            h={'43px'}
            w={'43px'}
          />
          <Avatar
            name='Yhwach'
            src='http://img1.wikia.nocookie.net/__cb20150520013839/bleach/en/images/7/72/626Yhwach_reveals.png'
            h={'43px'}
            w={'43px'}
          />
          <Avatar
            name='As Nodt'
            src='https://pbs.twimg.com/media/E3UQWwZX0Ao9vBw.jpg'
            h={'43px'}
            w={'43px'}
          />
          <Avatar
            name='Bambietta Basterbine'
            src='https://i.pinimg.com/564x/38/d0/b3/38d0b3d24a5a235bd9cd40645b5b1e5d.jpg'
            h={'43px'}
            w={'43px'}
          />
        </AvatarGroup>
      </div>
    </ChakraProvider>
  );
};

export default Filter;
