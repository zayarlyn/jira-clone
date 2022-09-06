import {
  ChakraProvider,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  ModalBody,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import FormWithLabel from '../util/FormWithLabel';
import type { IssueModelProps } from './IssueModelHOC';

const IssueDetailModel = (props: IssueModelProps) => {
  const { form, isInvalid, dispatch } = props;

  return (
    <ChakraProvider>
      <ModalHeader>just a header</ModalHeader>
      <ModalBody>
        <div className='flex'>
          <div className='grow pr-6'>
            <FormWithLabel label=''>
              <>
                <Input
                  size='sm'
                  variant='filled'
                  borderWidth={1}
                  borderColor='gray.300'
                  _focus={{ borderWidth: 2 }}
                  value={form.summary}
                  onChange={(e) => dispatch({ type: 'SUMMARY', value: e.target.value })}
                  isRequired={true}
                />
                {isInvalid && (
                  <span className='text-[13px] text-red-500'>summary must not be empty</span>
                )}
              </>
            </FormWithLabel>
          </div>
          <div className='bg-purple-400 w-[15rem]'>right</div>
        </div>
      </ModalBody>
    </ChakraProvider>
  );
};

export default IssueDetailModel;
