import {
  Button,
  ChakraProvider,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { selectIssuesArray, useUpdateIssueMutation } from '../../api/issues.endpoint';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';
import type { IssueModelAction, IssueModelProps } from './IssueModelHOC';

const IssueDetailModel = (props: IssueModelProps) => {
  const { issue, members, lists, types, priorities, handleClose } = props;
  const { issues } = selectIssuesArray(issue?.listId as number);
  const {
    id,
    type,
    listId,
    priority,
    assignees,
    summary: SUMMARY,
    descr: DESCR,
  } = issues[issue?.idx as number];
  const [updateIssue] = useUpdateIssueMutation();
  const [summary, setSummary] = useState(SUMMARY);
  const [descr, setDescr] = useState(DESCR);
  const [isInvalid, setIsInvalid] = useState(false);
  const memberObj = members.reduce((t, n) => ({ ...t, [n.value]: n }), {});

  const dispatchMiddleware = ({ type, value }: IssueModelAction) => {
    const formType = type === 'LISTID' ? 'listId' : type.toLowerCase();
    console.log(type, value, formType);
    updateIssue({ id, body: { [formType]: value } });
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
            <FormWithLabel label=''>
              <>
                <Textarea
                  borderColor='transparent'
                  overflow='hidden'
                  borderRadius={2}
                  fontWeight={600}
                  borderWidth={1}
                  resize='none'
                  fontSize={22}
                  minH='unset'
                  minRows={1}
                  size='sm'
                  as={ResizeTextarea}
                  value={summary}
                  isRequired
                  _hover={{ bg: 'gray.100' }}
                  onChange={(e) => setSummary(e.target.value)}
                />
                {isInvalid && (
                  <span className='text-[13px] text-red-500'>summary must not be empty</span>
                )}
              </>
            </FormWithLabel>
            <FormWithLabel label='Description' labelClass='pl-3 mb-0 text-[14px]'>
              <Textarea
                fontSize={16}
                borderWidth={1}
                borderColor='transparent'
                borderRadius={2}
                minRows={1}
                minH='unset'
                resize='none'
                overflow='hidden'
                as={ResizeTextarea}
                size='sm'
                value={descr}
                _hover={{ bg: 'gray.100' }}
                onChange={(e) => setDescr(e.target.value)}
              />
            </FormWithLabel>
          </div>
          <div className='w-[15rem] shrink-0 mt-3'>
            <FormWithLabel label='Status'>
              <DropDown
                list={lists}
                defaultValue={lists.findIndex(({ value: v }) => v === listId)}
                dispatch={dispatchMiddleware}
                actionType='LISTID'
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
                  actionType='ASSIGNEE'
                  type='multiple'
                />
              </FormWithLabel>
            )}
            <FormWithLabel label='Priority'>
              <DropDown
                variant='small'
                list={priorities}
                defaultValue={priority as number}
                dispatch={dispatchMiddleware}
                actionType='PRIORITY'
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
      <ModalFooter></ModalFooter>
    </ChakraProvider>
  );
};

export default IssueDetailModel;
