import { useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { APIERROR, CreateIssue } from '../../api/apiTypes';
import { selectAuthUser } from '../../api/endpoints/auth.endpoint';
import { useCreateIssueMutation } from '../../api/endpoints/issues.endpoint';
import DropDown from '../util/DropDown';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import Model from '../util/Model';
import type { IssueModalProps } from './IssueModelHOC';
import TextInput from './TextInput';
import toast from 'react-hot-toast';

const CreateIssueModel = (props: IssueModalProps) => {
  const { lists, members, types, priorities, onClose } = props;
  const { authUser: u } = selectAuthUser();
  const [createIssue, { error, isLoading }] = useCreateIssueMutation();
  const [form, dispatch] = useReducer(reducer, initial);
  const [err, setErr] = useState('');
  const projectId = Number(useParams().projectId);

  if (!u) return null;

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  const handleCreateIssue = async () => {
    if (!form.summary) return setErr('summary must not be empty');
    if (!u || form.summary.length > 100 || form.descr.length > 500) return;
    await createIssue({ ...form, reporterId: u.id, projectId }); //for now
    toast('Created an issue!');
    onClose();
  };

  return (
    <Model onSubmit={handleCreateIssue} {...{ onClose, isLoading }} className='max-w-[35rem]'>
      <>
        <span className='text-[22px] font-[600] text-c-1'>Create Issue</span>
        <WithLabel label='Issue type'>
          <DropDown
            list={types}
            dispatch={dispatch}
            actionType='type'
            type='normal'
            className='w-full'
          />
        </WithLabel>

        <TextInput
          type='summary'
          label='Summary'
          dispatch={dispatch}
          value={form.summary}
          max={100}
        />
        {err && <span className='-mb-3 block text-sm text-red-400'>{err}</span>}
        <TextInput
          type='descr'
          label='Description'
          dispatch={dispatch}
          value={form.descr}
          max={500}
        />
        {members && (
          <>
            <WithLabel label='Reporter'>
              <div className='rounded-sm bg-[#f4f5f7] px-3 py-[5px]'>
                <Item
                  {...members.filter(({ value: v }) => v === u.id)[0]}
                  size='h-6 w-6'
                  variant='ROUND'
                />
              </div>
            </WithLabel>

            <WithLabel label='Assignee'>
              <DropDown
                list={members}
                dispatch={dispatch}
                actionType='assignee'
                type='multiple'
                className='w-full'
              />
            </WithLabel>
          </>
        )}
        <WithLabel label='Priority'>
          <DropDown
            list={priorities}
            dispatch={dispatch}
            actionType='priority'
            type='normal'
            className='w-full'
          />
        </WithLabel>
        {lists && (
          <WithLabel label='Status'>
            <DropDown
              list={lists}
              dispatch={dispatch}
              actionType='listId'
              type='normal'
              className='w-full'
            />
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
