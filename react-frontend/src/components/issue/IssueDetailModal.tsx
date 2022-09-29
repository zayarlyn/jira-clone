import { Button, ChakraProvider, IconButton, ModalBody, ModalHeader } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { UpdateIssueType } from '../../api/apiTypes';
import {
  selectIssuesArray,
  useDeleteIssueMutation,
  useUpdateIssueMutation,
} from '../../api/issues.endpoint';
import ConfirmModel from '../util/ConfirmModel';
import DropDown from '../util/DropDown';
import WithLabel from '../util/WithLabel';
import Item from '../util/Item';
import type { IssueModalProps } from './IssueModelHOC';
import TextInput from './TextInput';
import Model from '../util/Model';

const constructApiAssignee = (OLD: number[], NEW: number[]): DispatchMiddleware | undefined => {
  const oldLen = OLD.length,
    newLen = NEW.length;
  if (oldLen === newLen) return;
  const userId = newLen > oldLen ? NEW[newLen - 1] : OLD.filter((id) => !NEW.includes(id))[0];
  return { type: newLen > oldLen ? 'addAssignee' : 'removeAssignee', value: userId };
};

const IssueDetailModal = (props: IssueModalProps) => {
  const { issue, projectId, members, lists, types, priorities, onClose } = props;
  const { issues } = selectIssuesArray({
    listId: issue?.listId as number,
    projectId,
  });
  const { id, type, listId, reporterId, priority, assignees, summary, descr } =
    issues[issue?.idx as number];
  const memberObj = members.reduce((t, n) => ({ ...t, [n.value]: n }), {});
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
        <div className='text-[16px] text-gray-600 px-3 mt-3 flex items-center justify-between'>
          <Item className='mr-3 w-4 h-4' {...types[type]} text={'Issue-' + id} />
          <div className='text-black'>
            <button onClick={() => setIsOpen(true)} className='icon-btn text-xl'>
              <Icon icon='bx:trash' />
            </button>
            <button onClick={onClose} className='icon-btn text-lg ml-4'>
              <Icon icon='akar-icons:cross' />
            </button>
          </div>
        </div>
        <div className='flex mb-8'>
          <div className='w-full pr-6'>
            <ChakraProvider>
              <TextInput
                type='summary'
                defaultValue={summary}
                apiFunc={dispatchMiddleware}
                fontWeight={600}
                fontSize={22}
                placeholder='title'
              />
              <TextInput
                label='Description'
                type='descr'
                defaultValue={descr}
                apiFunc={dispatchMiddleware}
                placeholder='add a description'
              />
            </ChakraProvider>
          </div>
          <div className='w-[15rem] shrink-0 mt-3'>
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
                <Button
                  borderColor='gray.300'
                  justifyContent='start'
                  borderRadius={3}
                  display='flex'
                  size='sm'
                  w='fit'
                  px={4}
                  mb={7}
                >
                  <Item
                    {...members.filter(({ value }) => value === reporterId)[0]}
                    className='w-6 h-6 mr-4 rounded-full object-cover'
                  />
                </Button>
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
            <div className='mt-4 text-sm text-gray-600'>
              <span className='block mb-2'>Created - 13 days ago</span>
              <span>Updated - 3 days ago</span>
            </div>
          </div>
        </div>
        {isOpen && (
          <ConfirmModel
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={() => deleteIssue({ issueId: id, projectId })}
          />
        )}
      </>
    </Model>
  );
};

export default IssueDetailModal;

export type DispatchMiddleware = { type: UpdateIssueType; value: number | number[] | string };
