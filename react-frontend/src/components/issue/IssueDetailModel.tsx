import {
  Button,
  ChakraProvider,
  Divider,
  Input,
  ModalBody,
  ModalHeader,
  Text,
  Textarea,
} from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';
import type { IssueModelProps } from './IssueModelHOC';

const IssueDetailModel = (props: IssueModelProps) => {
  const { members, lists, priorities, form, isInvalid, dispatch } = props;

  return (
    <ChakraProvider>
      <ModalHeader>l</ModalHeader>
      <ModalBody>
        <div className='flex'>
          <div className='w-full pr-6'>
            <FormWithLabel label=''>
              <>
                <Textarea
                  fontSize={22}
                  borderWidth={1}
                  borderColor='transparent'
                  borderRadius={2}
                  minRows={1}
                  minH='unset'
                  resize='none'
                  overflow='hidden'
                  size='sm'
                  fontWeight={600}
                  as={ResizeTextarea}
                  value={form.summary}
                  isRequired
                  _hover={{ bg: 'gray.100' }}
                  onChange={(e) => dispatch({ type: 'SUMMARY', value: e.target.value })}
                />
                {isInvalid && (
                  <span className='text-[13px] text-red-500'>summary must not be empty</span>
                )}
              </>
            </FormWithLabel>
            <FormWithLabel label='Description' labelClass='pl-3 mb-0 text-[14px]'>
              <Textarea
                fontSize={17}
                borderWidth={1}
                borderColor='transparent'
                borderRadius={2}
                minRows={1}
                minH='unset'
                resize='none'
                overflow='hidden'
                as={ResizeTextarea}
                size='sm'
                value={form.descr}
                _hover={{ bg: 'gray.100' }}
                onChange={(e) => dispatch({ type: 'DESCR', value: e.target.value })}
              />
            </FormWithLabel>
          </div>
          <div className='w-[15rem] shrink-0 mt-3'>
            <FormWithLabel label='Status'>
              <DropDown list={lists} dispatch={dispatch} actionType='LISTID' type='normal' />
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
                <DropDown
                  list={members}
                  dispatch={dispatch}
                  actionType='ASSIGNEE'
                  type='multiple'
                />
              </FormWithLabel>
            )}
            <FormWithLabel label='Priority'>
              <DropDown list={priorities} dispatch={dispatch} actionType='PRIORITY' type='normal' />
            </FormWithLabel>
            <hr className='border-t-[.5px] border-gray-400' />
            <div className='mt-3 text-sm text-gray-600'>
              <span className='block mb-2'>Created - 13 days ago</span>
              <span>Updated - 3 days ago</span>
            </div>
          </div>
        </div>
      </ModalBody>
    </ChakraProvider>
  );
};

export default IssueDetailModel;
