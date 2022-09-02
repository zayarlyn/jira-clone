import {
  Button,
  ChakraProvider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useReducer, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { selectMembers } from '../../api/project.endpoint';
import { types, priorities } from '../../category';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';

const reducer = (state: S, { type, value }: A): S => {
  switch (type) {
    case 'ISSUE':
      return { ...state, issue: value as number };
    case 'SUMMARY':
      return { ...state, summary: value as string };
    case 'DESCR':
      return { ...state, descr: value as string };
    case 'ASSIGNEE':
      return { ...state, assignee: value as number };
    case 'PRIORITY':
      return { ...state, priority: value as number };
    default:
      return state;
  }
};

const initial = {
  issue: 0,
  summary: '',
  descr: '',
  assignee: 0,
  priority: 0,
};

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateIssueModel = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const { members } = selectMembers(1);
  const ddMembers = members?.map(({ username, profileUrl }) => ({
    text: username,
    icon: profileUrl,
  }));
  const [state, dispatch] = useReducer(reducer, initial);
  console.log(state);

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size='xl'>
        <ModalOverlay bgColor='#0d67cc30' />
        <ModalContent borderRadius={2}>
          <ModalHeader>
            <Text fontWeight={500} fontSize={19}>
              Create Issue
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormWithLabel label='Issue type'>
              <DropDown list={types} dispatch={dispatch} actionType='ISSUE' type='normal' />
            </FormWithLabel>
            <FormWithLabel label='Short summary'>
              <Input
                size='sm'
                variant='filled'
                borderWidth={1}
                borderColor='gray.300'
                _focus={{ borderWidth: 2 }}
                value={state.summary}
                onChange={(e) => dispatch({ type: 'SUMMARY', value: e.target.value })}
              />
            </FormWithLabel>
            <FormWithLabel label='Description'>
              <Textarea
                minH='unset'
                overflow='hidden'
                resize='none'
                minRows={3}
                as={ResizeTextarea}
                borderRadius={2}
                value={state.descr}
                onChange={(e) => dispatch({ type: 'DESCR', value: e.target.value })}
              />
            </FormWithLabel>
            {ddMembers && (
              <FormWithLabel label='Reporter'>
                <Button
                  display='flex'
                  justifyContent='start'
                  size='sm'
                  w='full'
                  borderWidth={1}
                  borderColor='gray.300'
                  borderRadius={3}
                  px={4}
                >
                  <Item icon={ddMembers[0].icon} text='Yhwach' className='w-6 h-6 mr-4' />
                </Button>
              </FormWithLabel>
            )}
            {ddMembers && (
              <FormWithLabel label='Assignee'>
                <DropDown
                  list={ddMembers}
                  dispatch={dispatch}
                  actionType='ASSIGNEE'
                  type='multiple'
                />
              </FormWithLabel>
            )}
            <FormWithLabel label='Priority'>
              <DropDown list={priorities} dispatch={dispatch} actionType='PRIORITY' type='normal' />
            </FormWithLabel>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' fontSize={16} fontWeight={500} variant='ghost' mr={4}>
              cancel
            </Button>
            <Button
              size='sm'
              fontSize={16}
              fontWeight={500}
              borderRadius={3}
              colorScheme='messenger'
            >
              create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CreateIssueModel;

type S = {
  issue: number;
  assignee: number;
  priority: number;
  summary: string;
  descr: string;
};

export type T = 'ISSUE' | 'SUMMARY' | 'DESCR' | 'ASSIGNEE' | 'PRIORITY';

export type A = { type: T; value: number | string };
