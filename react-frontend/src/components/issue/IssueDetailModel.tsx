import { Button, ChakraProvider, IconButton, ModalBody, ModalHeader } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { UpdateIssueType } from '../../api/apiTypes';
import { selectIssuesArray, useUpdateIssueMutation } from '../../api/issues.endpoint';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';
import type { IssueModelProps } from './IssueModelHOC';
import TextInput from './TextInput';

const constructApiAssignee = (OLD: number[], NEW: number[]): DispatchMiddleware | undefined => {
  const oldLen = OLD.length,
    newLen = NEW.length;
  if (oldLen === newLen) return;
  const userId = newLen > oldLen ? NEW[newLen - 1] : OLD.filter((id) => !NEW.includes(id))[0];
  return { type: newLen > oldLen ? 'addAssignee' : 'removeAssignee', value: userId };
};

const IssueDetailModel = (props: IssueModelProps) => {
  const { issue, members, lists, types, priorities, handleClose } = props;
  const { issues } = selectIssuesArray(issue?.listId as number);
  const { id, type, listId, priority, assignees, summary, descr } = issues[issue?.idx as number];
  const [updateIssue] = useUpdateIssueMutation();
  const memberObj = members.reduce((t, n) => ({ ...t, [n.value]: n }), {});

  const dispatchMiddleware = (data: DispatchMiddleware) => {
    const assigneeIds = assignees.map(({ userId }) => userId);
    const body =
      data.type === 'assignee' ? constructApiAssignee(assigneeIds, data.value as number[]) : data;
    if (!body) return;
    updateIssue({ id, body });
  };

  return (
    <ChakraProvider>
      <ModalHeader>
        <div className='text-[16px] text-gray-600 px-3 mt-3 flex items-center justify-between'>
          <Item className='mr-3 w-4 h-4' {...types[type]} text={'Issue-' + id} />
          <div className='text-black'>
            <IconButton
              size='sm'
              variant='ghost'
              aria-label='delete issue'
              icon={<Icon className='text-xl' icon='bx:trash' />}
            />
            <IconButton
              size='sm'
              variant='ghost'
              ml={3}
              aria-label='close issue detail'
              onClick={handleClose}
              icon={<Icon className='text-lg' icon='akar-icons:cross' />}
            />
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className='flex mb-8'>
          <div className='w-full pr-6'>
            <TextInput
              type='summary'
              defaultValue={summary}
              apiFunc={dispatchMiddleware}
              fontWeight={600}
              fontSize={22}
            />
            <TextInput
              label='Description'
              type='descr'
              defaultValue={descr}
              apiFunc={dispatchMiddleware}
            />
          </div>
          <div className='w-[15rem] shrink-0 mt-3'>
            <FormWithLabel label='Status'>
              <DropDown
                list={lists}
                defaultValue={lists.findIndex(({ value: v }) => v === listId)}
                dispatch={dispatchMiddleware}
                actionType='listId'
                type='normal'
                variant='small'
              />
            </FormWithLabel>
            {members && (
              <FormWithLabel label='Reporter'>
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
                  <Item {...members[2]} className='w-6 h-6 mr-4 rounded-full object-cover' />
                </Button>
              </FormWithLabel>
            )}
            {members && (
              <FormWithLabel label='Assignee'>
                <DropDown
                  variant='small'
                  list={members}
                  defaultValue={assignees.map(({ userId }) => memberObj[userId])}
                  dispatch={dispatchMiddleware}
                  actionType='assignee'
                  type='multiple'
                />
              </FormWithLabel>
            )}
            <FormWithLabel label='Type'>
              <DropDown
                variant='small'
                list={types}
                defaultValue={types.findIndex(({ value: v }) => v === type)}
                dispatch={dispatchMiddleware}
                actionType='type'
                type='normal'
              />
            </FormWithLabel>
            <FormWithLabel label='Priority'>
              <DropDown
                variant='small'
                list={priorities}
                defaultValue={priority as number}
                dispatch={dispatchMiddleware}
                actionType='priority'
                type='normal'
              />
            </FormWithLabel>
            <hr className='border-t-[.5px] border-gray-400' />
            <div className='mt-4 text-sm text-gray-600'>
              <span className='block mb-2'>Created - 13 days ago</span>
              <span>Updated - 3 days ago</span>
            </div>
          </div>
        </div>
      </ModalBody>
      {/* <ModalFooter></ModalFooter> */}
    </ChakraProvider>
  );
};

export default IssueDetailModel;

export type DispatchMiddleware = { type: UpdateIssueType; value: number | number[] | string };
