import { Button, Textarea } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import { UpdateIssueType } from '../../api/apiTypes';
import WithLabel from '../util/WithLabel';
import type { DispatchMiddleware } from './IssueDetailModal';

interface Props {
  type: UpdateIssueType;
  label?: string;
  defaultValue: string;
  fontSize?: number;
  fontWeight?: number;
  apiFunc: (data: DispatchMiddleware) => void;
}

const TextInput = (props: Props) => {
  const { type, label, defaultValue, apiFunc, fontSize: fs, fontWeight: fw } = props;
  const [value, setValue] = useState(defaultValue ?? '');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    !isEditing && setIsEditing(true);
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleCancel = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (value === defaultValue) return;
    apiFunc({ type, value });
  };

  return (
    <div>
      <WithLabel label={label ?? ''} labelClass='ml-3'>
        <>
          <Textarea
            borderColor='transparent'
            textColor='blackAlpha.900'
            overflow='hidden'
            borderRadius={2}
            fontWeight={fw || 500}
            fontSize={fs || 18}
            borderWidth={1}
            resize='none'
            minH='unset'
            minRows={1}
            size='sm'
            as={reactTextareaAutosize}
            value={value}
            isRequired
            _hover={{ bg: 'gray.100' }}
            onChange={handleChange}
          />
          {isEditing && (
            <>
              <hr className='border-t-[.5px] border-gray-400 mt-3 mb-2 mx-3' />
              <div className='flex justify-end'>
                <Button onClick={handleCancel} size='sm' borderRadius={3} variant='ghost' mr={3}>
                  cancel
                </Button>
                <Button onClick={handleSave} size='sm' borderRadius={3} colorScheme='blue'>
                  save
                </Button>
              </div>
            </>
          )}
        </>
      </WithLabel>
    </div>
  );
};

export default TextInput;
