import { Icon } from '@iconify/react';
import { lazy, Suspense as S, useState } from 'react';
import { UpdateIssueType } from '../../api/apiTypes';
import {
  selectIssuesArray,
  useDeleteIssueMutation,
  useUpdateIssueMutation,
} from '../../api/issues.endpoint';
import DropDown, { Category } from '../util/DropDown';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import type { IssueModalProps } from './IssueModelHOC';
import TextInput from './TextInput';
import Model from '../util/Model';
const ConfirmModel = lazy(() => import('../util/ConfirmModel'));

const constructApiAssignee = (OLD: number[], NEW: number[]): DispatchMiddleware | undefined => {
  const oldLen = OLD.length,
    newLen = NEW.length;
  if (oldLen === newLen) return;
  const userId = newLen > oldLen ? NEW[newLen - 1] : OLD.filter((id) => !NEW.includes(id))[0];
  return {
    type: newLen > oldLen ? 'addAssignee' : 'removeAssignee',
    value: userId,
  };
};

const IssueDetailModal = (props: IssueModalProps) => {
  const { issue, projectId, members, lists, types, priorities, onClose } = props;
  const { issues } = selectIssuesArray({
    listId: issue?.listId as number,
    projectId,
  });
  const {
    id,
    type,
    listId,
    reporterId,
    priority,
    assignees,
    summary,
    descr,
    createdAt,
    updatedAt,
  } = issues[issue?.idx as number];
  const memberObj = members.reduce((t, n) => ({ ...t, [n.value]: n }), {}) as Category[];
  const [updateIssue] = useUpdateIssueMutation();
  const [deleteIssue] = useDeleteIssueMutation();
  const [isOpen, setIsOpen] = useState(false);

  const dispatchMiddleware = (data: DispatchMiddleware) => {
    const assigneeIds = assignees.map(({ userId }) => userId);
    const body =
      data.type === 'assignee' ? constructApiAssignee(assigneeIds, data.value as number[]) : data;
    if (!body) return;
    updateIssue({ id, body: { ...body, projectId: Number(projectId) } });
  };

  return (
    <Model onClose={onClose} className='max-w-[55rem]'>
      <>
        <div className='mt-3 flex items-center justify-between text-[16px] text-gray-600 sm:px-3'>
          <Item className='mr-3 h-4 w-4' {...types[type]} text={'Issue-' + id} />
          <div className='text-black'>
            <button onClick={() => setIsOpen(true)} title='Delete' className='btn-icon text-xl'>
              <Icon icon='bx:trash' />
            </button>
            <button onClick={onClose} title='Close' className='btn-icon ml-4 text-lg'>
              <Icon icon='akar-icons:cross' />
            </button>
          </div>
        </div>
        <div className='mb-8 sm:flex'>
          <div className='w-full sm:pr-6'>
            <TextInput
              type='summary'
              label='Title'
              defaultValue={summary}
              apiFunc={dispatchMiddleware}
              className='font-medium sm:text-[22px] sm:font-semibold'
              placeholder='title'
              isRequired
            />
            <TextInput
              label='Description'
              type='descr'
              defaultValue={descr}
              apiFunc={dispatchMiddleware}
              placeholder='add a description'
            />
          </div>
          <div className='mt-3 shrink-0 sm:w-[15rem]'>
            <WithLabel label='Status'>
              <DropDown
                list={lists}
                defaultValue={lists.findIndex(({ value: v }) => v === listId)}
                dispatch={dispatchMiddleware}
                actionType='listId'
                type='normal'
                variant='small'
              />
            </WithLabel>
            {members && (
              <WithLabel label='Reporter'>
                <div className='rounded-sm bg-[#f4f5f7] px-4 py-[5px] sm:w-fit'>
                  <Item
                    {...members.filter(({ value }) => value === reporterId)[0]}
                    className='mr-4 h-6 w-6 rounded-full object-cover'
                  />
                </div>
              </WithLabel>
            )}
            {members && (
              <WithLabel label='Assignee'>
                <DropDown
                  variant='small'
                  list={members}
                  defaultValue={assignees.map(({ userId }) => memberObj[userId])}
                  dispatch={dispatchMiddleware}
                  actionType='assignee'
                  type='multiple'
                />
              </WithLabel>
            )}
            <WithLabel label='Type'>
              <DropDown
                variant='small'
                list={types}
                defaultValue={types.findIndex(({ value: v }) => v === type)}
                dispatch={dispatchMiddleware}
                actionType='type'
                type='normal'
              />
            </WithLabel>
            <WithLabel label='Priority'>
              <DropDown
                variant='small'
                list={priorities}
                defaultValue={priority as number}
                dispatch={dispatchMiddleware}
                actionType='priority'
                type='normal'
              />
            </WithLabel>
            <hr className='border-t-[.5px] border-gray-400' />
            <div className='mt-4 text-sm text-gray-700'>
              {createdAt && (
                <span className='mb-2 block'>Created - {new Date(createdAt).toLocaleString()}</span>
              )}
              {updatedAt && <span>Updated - {new Date(updatedAt).toLocaleString()}</span>}
            </div>
          </div>
        </div>
        {isOpen && (
          <S>
            <ConfirmModel
              onClose={() => setIsOpen(false)}
              onSubmit={() => deleteIssue({ issueId: id, projectId })}
            />
          </S>
        )}
      </>
    </Model>
  );
};

export default IssueDetailModal;

export type DispatchMiddleware = {
  type: UpdateIssueType;
  value: number | number[] | string;
};
