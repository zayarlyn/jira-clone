import { useReducer, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { APIERROR, CreateIssue } from '../../api/apiTypes';
import { selectAuthUser } from '../../api/auth.endpoint';
import { useCreateIssueMutation } from '../../api/issues.endpoint';
import DropDown from '../util/DropDown';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import Model from '../util/Model';
import type { IssueModalProps } from './IssueModelHOC';

const CreateIssueModel = (props: IssueModalProps) => {
  const { lists, members, types, priorities, onClose } = props;
  const { authUser: u } = selectAuthUser();
  const [createIssue, { error, isLoading }] = useCreateIssueMutation();
  const [form, dispatch] = useReducer(reducer, initial);
  const [isInvalid, setIsInvalid] = useState(false);
  const projectId = Number(useParams().projectId);

  if (!u) return null;

  if (error && (error as APIERROR).status === 401) return <Navigate to='/login' />;

  const handleCreateIssue = async () => {
    if (!form.summary || !u) return setIsInvalid(true);
    await createIssue({ ...form, reporterId: u.id, projectId }); //for now
    onClose();
  };

  return (
    <Model onSubmit={handleCreateIssue} {...{ onClose, isLoading }} className='max-w-[35rem]'>
      <>
        <span className='font-[600] text-[22px] text-c-1'>Create Issue</span>
        <WithLabel label='Issue type'>
          <DropDown
            list={types}
            dispatch={dispatch}
            actionType='type'
            type='normal'
            className='w-full'
          />
        </WithLabel>

        <WithLabel label='Short summary'>
          <>
            <input
              placeholder='a short summary of your project'
              onChange={(e) => dispatch({ type: 'summary', value: e.target.value })}
              className='block w-full focus:border-chakra-blue mt-2 px-3 rounded-sm text-sm py-1 border-2 duration-200 outline-none'
            />
            {isInvalid && (
              <span className='text-[13px] text-red-500'>summary must not be empty</span>
            )}
          </>
        </WithLabel>
        <WithLabel label='Description'>
          <input
            placeholder='a description of your project'
            onChange={(e) => dispatch({ type: 'descr', value: e.target.value })}
            className='block w-full focus:border-chakra-blue mt-2 px-3 rounded-sm text-sm py-1 border-2 duration-200 outline-none'
          />
        </WithLabel>
        {members && (
          <>
            <WithLabel label='Reporter'>
              <div className='bg-[#f4f5f7] px-3 py-[5px] rounded-sm'>
                <Item
                  {...members.filter(({ value: v }) => v === u.id)[0]}
                  className='w-6 h-6 mr-4 rounded-full object-cover'
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
