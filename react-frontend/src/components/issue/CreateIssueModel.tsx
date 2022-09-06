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
import ResizeTextarea from 'react-textarea-autosize';
import { useCreateIssueMutation } from '../../api/issues.endpoint';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';
import type { IssueModelProps } from './IssueModelHOC';

const CreateIssueModel = (props: IssueModelProps) => {
  const {
    lists,
    members,
    types,
    priorities,
    form,
    isLoading,
    isInvalid,
    dispatch,
    handleClose,
    handleApiMutation,
  } = props;
  const [createIssue] = useCreateIssueMutation();

  // const handleCreateIssue = () => createIssue({ ...form, reporterId: 2 });

  return (
    <ChakraProvider>
      <ModalHeader>
        <Text fontWeight={500} fontSize={19}>
          Create TYPE
        </Text>
      </ModalHeader>
      <ModalBody>
        <FormWithLabel label='TYPE type'>
          <DropDown list={types} dispatch={dispatch} actionType='TYPE' type='normal' />
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
              onChange={(e) => dispatch({ type: 'SUMMARY', value: e.target.value })}
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
            onChange={(e) => dispatch({ type: 'DESCR', value: e.target.value })}
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
            <DropDown list={members} dispatch={dispatch} actionType='ASSIGNEE' type='multiple' />
          </FormWithLabel>
        )}
        <FormWithLabel label='Priority'>
          <DropDown list={priorities} dispatch={dispatch} actionType='PRIORITY' type='normal' />
        </FormWithLabel>
        {lists && (
          <FormWithLabel label='Status'>
            <DropDown list={lists} dispatch={dispatch} actionType='LISTID' type='normal' />
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
          onClick={handleApiMutation(createIssue)} // 2 for now
        >
          create
        </Button>
      </ModalFooter>
    </ChakraProvider>
  );
};

export default CreateIssueModel;

export type T = 'TYPE' | 'SUMMARY' | 'DESCR' | 'ASSIGNEE' | 'PRIORITY' | 'LISTID';

export type A = { type: T; value: number | number[] | string };
