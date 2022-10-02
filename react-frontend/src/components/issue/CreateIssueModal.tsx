import { Button, Input, Text, Textarea } from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ResizeTextarea from 'react-textarea-autosize';
import { APIERROR, CreateIssue } from '../../api/apiTypes';
import { selectAuthUser } from '../../api/auth.endpoint';
import { useCreateIssueMutation } from '../../api/issues.endpoint';
import DropDown from '../util/DropDown';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import type { IssueModalProps } from './IssueModelHOC';
import Model from '../util/Model';

const CreateIssueModel = (props: IssueModalProps) => {
  const { lists, members, types, priorities, onClose } = props;
  const { authUser } = selectAuthUser();
  const [createIssue, { error, isLoading }] = useCreateIssueMutation();
  const [form, dispatch] = useReducer(reducer, initial);
  const [isInvalid, setIsInvalid] = useState(false);
  const projectId = Number(useParams().projectId);

  if (!authUser) return null;

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  const handleCreateIssue = async () => {
    if (!form.summary || !authUser) return setIsInvalid(true);
    await createIssue({ ...form, reporterId: authUser.id, projectId }); //for now
    onClose();
  };

  return (
    <Model onSubmit={handleCreateIssue} {...{ onClose, isLoading }} className='max-w-[35rem]'>
      <>
        <span className='font-[600] text-[22px] text-c-1'>Create Issue</span>
        <WithLabel label='Issue type'>
          <DropDown list={types} dispatch={dispatch} actionType='type' type='normal' />
        </WithLabel>
        <WithLabel label='Short summary'>
          <>
            <Input
              size='sm'
              variant='filled'
              borderWidth={1}
              borderColor='gray.300'
              _focus={{ borderWidth: 2 }}
              value={form.summary}
              color='black'
              onChange={(e) => dispatch({ type: 'summary', value: e.target.value })}
              isRequired
            />
            {isInvalid && (
              <span className='text-[13px] text-red-500'>summary must not be empty</span>
            )}
          </>
        </WithLabel>
        <WithLabel label='Description'>
          <Textarea
            minH='unset'
            overflow='hidden'
            resize='none'
            minRows={3}
            as={ResizeTextarea}
            borderRadius={2}
            value={form.descr}
            color='black'
            onChange={(e) => dispatch({ type: 'descr', value: e.target.value })}
          />
        </WithLabel>
        {members && (
          <WithLabel label='Reporter'>
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
                {...members.filter(({ value: v }) => v === authUser.id)[0]}
                className='w-6 h-6 mr-4 rounded-full object-cover'
              />
            </Button>
          </WithLabel>
        )}
        {members && (
          <WithLabel label='Assignee'>
            <DropDown list={members} dispatch={dispatch} actionType='assignee' type='multiple' />
          </WithLabel>
        )}
        <WithLabel label='Priority'>
          <DropDown list={priorities} dispatch={dispatch} actionType='priority' type='normal' />
        </WithLabel>
        {lists && (
          <WithLabel label='Status'>
            <DropDown list={lists} dispatch={dispatch} actionType='listId' type='normal' />
          </WithLabel>
        )}
      </>
    </Model>
  );
};

export default CreateIssueModel;

export type T = 'type' | 'summary' | 'descr' | 'assignee' | 'priority' | 'listId';

export type A = { type: T; value: number | number[] | string };

const initial: State = {
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
