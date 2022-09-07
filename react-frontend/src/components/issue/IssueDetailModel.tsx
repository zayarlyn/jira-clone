import {
  Button,
  ChakraProvider,
  IconButton,
  ModalBody,
  ModalHeader,
  Textarea,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import ResizeTextarea from 'react-textarea-autosize';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import IconBtn from '../util/IconBtn';
import Item from '../util/Item';
import type { IssueModelProps } from './IssueModelHOC';

const IssueDetailModel = (props: IssueModelProps) => {
  const { members, lists, types, priorities, form, isInvalid, dispatch } = props;
  const metadata = types[form.type];

  return (
    <ChakraProvider>
      <ModalHeader>
        <div className='text-[16px] text-gray-600 px-3 mt-3 flex items-center justify-between'>
          <Item className='mr-3 w-4 h-4' {...metadata} text={metadata.text + '-' + form.id} />
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
                value={form.descr}
                _hover={{ bg: 'gray.100' }}
                onChange={(e) => dispatch({ type: 'DESCR', value: e.target.value })}
              />
            </FormWithLabel>
          </div>
          <div className='w-[15rem] shrink-0 mt-3'>
            <FormWithLabel label='Status'>
              <DropDown
                list={lists}
                dispatch={dispatch}
                actionType='LISTID'
                type='normal'
                variant='small'
              />
            </FormWithLabel>
            {members && (
              <FormWithLabel label='Reporter'>
                <Button
                  display='flex'
                  justifyContent='start'
                  size='sm'
                  w='fit'
                  borderColor='gray.300'
                  borderRadius={3}
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
                  dispatch={dispatch}
                  actionType='ASSIGNEE'
                  type='multiple'
                />
              </FormWithLabel>
            )}
            <FormWithLabel label='Priority'>
              <DropDown
                variant='small'
                list={priorities}
                dispatch={dispatch}
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
    </ChakraProvider>
  );
};

export default IssueDetailModel;
