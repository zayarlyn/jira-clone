import {
  Button,
  ChakraProvider,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResizeTextarea from 'react-textarea-autosize';
import { CreateIssue } from '../../api/apiTypes';
import { useCreateIssueMutation } from '../../api/issues.endpoint';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';
import type { IssueModelProps } from './IssueModelHOC';

const CreateIssueModel = (props: IssueModelProps) => {
  const { lists, members, types, priorities, handleClose } = props;
  const [createIssue] = useCreateIssueMutation();
  const [form, dispatch] = useReducer(reducer, initial);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();

  const handleCreateIssue = async () => {
    if (!form.summary) return setIsInvalid(true);
    setIsLoading(true);
    await createIssue({ ...form, reporterId: 2, projectId: Number(projectId) }); //for now
    setIsLoading(false);
    handleClose();
  };

  return (
    <ChakraProvider>
      <ModalHeader>
        <Text fontWeight={500} fontSize={19}>
          Create Issue
        </Text>
      </ModalHeader>
      <ModalBody>
        <FormWithLabel label='Issue type'>
          <DropDown list={types} dispatch={dispatch} actionType='type' type='normal' />
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
              onChange={(e) => dispatch({ type: 'summary', value: e.target.value })}
              isRequired
            />
            {isInvalid && (
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
            onChange={(e) => dispatch({ type: 'descr', value: e.target.value })}
          />
        </FormWithLabel>
        {members && (
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
              <Item {...members[2]} className='w-6 h-6 mr-4 rounded-full object-cover' />
            </Button>
          </FormWithLabel>
        )}
        {members && (
          <FormWithLabel label='Assignee'>
            <DropDown list={members} dispatch={dispatch} actionType='assignee' type='multiple' />
          </FormWithLabel>
        )}
        <FormWithLabel label='Priority'>
          <DropDown list={priorities} dispatch={dispatch} actionType='priority' type='normal' />
        </FormWithLabel>
        {lists && (
          <FormWithLabel label='Status'>
            <DropDown list={lists} dispatch={dispatch} actionType='listId' type='normal' />
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
          isLoading={isLoading}
          onClick={handleCreateIssue} // 2 for now
        >
          create
        </Button>
      </ModalFooter>
    </ChakraProvider>
  );
};

export default CreateIssueModel;

export type T = 'type' | 'summary' | 'descr' | 'assignee' | 'priority' | 'listId';

export type A = { type: T; value: number | number[] | string };

const initial = {
  descr: '',
  summary: '',
  priority: 0,
  type: 0,
  reporterId: null,
  assignees: [],
  listId: null,
};

type State = Omit<CreateIssue, 'projectId'>;

const reducer = (state: State, { type, value }: A): State => {
  switch (type) {
    case 'type':
      return { ...state, type: value as number };
    case 'summary':
      return { ...state, summary: value as string };
    case 'descr':
      return { ...state, descr: value as string };
    case 'assignee':
      return { ...state, assignees: value as number[] };
    case 'priority':
      return { ...state, priority: value as number };
    case 'listId':
      return { ...state, listId: value as number };
    default:
      return state;
  }
};
