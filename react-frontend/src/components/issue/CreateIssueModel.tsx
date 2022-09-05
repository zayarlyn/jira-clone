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
import axios from 'axios';
import { Dispatch, SetStateAction, useReducer, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { selectLists } from '../../api/lists.endpoint';
import { selectMembers } from '../../api/project.endpoint';
import { types, priorities } from '../../category';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';

const reducer = (state: S, { type, value }: A): S => {
  switch (type) {
    case 'TYPE':
      return { ...state, type: value as number };
    case 'SUMMARY':
      return { ...state, summary: value as string };
    case 'DESCR':
      return { ...state, descr: value as string };
    case 'ASSIGNEE':
      return { ...state, assignee: value as number[] };
    case 'PRIORITY':
      return { ...state, priority: value as number };
    case 'LIST':
      return { ...state, list: value as number };
    default:
      return state;
  }
};

const initial = {
  descr: '',
  summary: '',
  priority: 0,
  type: 0,
  reporter: null,
  assignee: [],
  list: null,
};

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateTYPEModel = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const [form, dispatch] = useReducer(reducer, initial);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const { members } = selectMembers(1);
  const { lists } = selectLists();
  const ddMembers = members?.map(({ id, username: u, profileUrl: p }) => ({
    text: u,
    icon: p,
    value: id,
  }));
  const ddLists = lists?.map(({ id, name }) => ({ text: name, value: id }));

  if (!members) return null;

  const handleCreateTYPE = async () => {
    if (!form.summary) return setInvalid(true);
    setInvalid(false);
    setLoading(true);
    await createTYPE({
      ...form,
      reporter: 2, // for now
    });
    setLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={handleClose} size='xl'>
        <ModalOverlay bgColor='#0d67cc30' />
        <ModalContent borderRadius={2}>
          <ModalHeader>
            <Text fontWeight={500} fontSize={19}>
              Create TYPE
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormWithLabel label='TYPE type'>
              <DropDown list={types} dispatch={dispatch} actionType='TYPE' type='normal' />
            </FormWithLabel>
            <FormWithLabel label='Short summary'>
              <>
                <Input
                  size='sm'
                  variant='filled'
                  borderWidth={1}
                  borderColor='gray.300'
                  _focus={{ borderWidth: 2 }}
                  value={form.summary}
                  onChange={(e) => dispatch({ type: 'SUMMARY', value: e.target.value })}
                  isRequired={true}
                />
                {invalid && (
                  <span className='text-[13px] text-red-500'>summary must not be empty</span>
                )}
              </>
            </FormWithLabel>
            <FormWithLabel label='Description'>
              <Textarea
                minH='unset'
                overflow='hidden'
                resize='none'
                minRows={3}
                as={ResizeTextarea}
                borderRadius={2}
                value={form.descr}
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
                  <Item
                    icon={ddMembers[0].icon}
                    text='Yhwach'
                    className='w-6 h-6 mr-4 rounded-full'
                  />
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
            {ddLists && (
              <FormWithLabel label='Deck'>
                <DropDown list={ddLists} dispatch={dispatch} actionType='LIST' type='normal' />
              </FormWithLabel>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              size='sm'
              fontSize={16}
              fontWeight={500}
              variant='ghost'
              mr={4}
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              size='sm'
              fontSize={16}
              fontWeight={500}
              borderRadius={3}
              colorScheme='messenger'
              isLoading={loading}
              onClick={handleCreateTYPE}
            >
              create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CreateTYPEModel;

interface S {
  type: number;
  reporter: number | null;
  assignee: number[];
  list: number | null;
  priority: number;
  summary: string;
  descr: string;
}

export type T = 'TYPE' | 'SUMMARY' | 'DESCR' | 'ASSIGNEE' | 'PRIORITY' | 'LIST';

export type A = { type: T; value: number | number[] | string };

const createTYPE = async (body: S) => {
  const { data } = await axios.post('http://localhost:5000/api/issue/create', body);
  return data;
};
