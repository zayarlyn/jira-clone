import { ChangeEvent, useState } from 'react';
import RTAutosize from 'react-textarea-autosize';
import { UpdateIssueType } from '../../api/apiTypes';
import WithLabel from '../util/WithLabel';
import type { DispatchMiddleware } from './IssueDetailModal';

interface Props {
  type: UpdateIssueType;
  label?: string;
  placeholder?: string;
  defaultValue: string;
  className?: string;
  isRequired?: boolean;
  apiFunc: (data: DispatchMiddleware) => void;
}

const TextInput = (props: Props) => {
  const { type, label, defaultValue, placeholder, apiFunc, className, isRequired } = props;
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
    if (value === defaultValue || (!value && isRequired)) return;
    apiFunc({ type, value });
  };

  return (
    <div>
      <WithLabel label={label ?? ''} labelClass='sm:ml-3'>
        <>
          <RTAutosize
            className={`px-3 py-1 sm:py-2 w-full border-2 border-stale-100 sm:border-transparent resize-none hover:bg-[#f4f5f7] rounded-[3px] outline-none focus:border-chakra-blue ${
              className ?? 'font-medium'
            }`}
            minRows={1}
            onChange={handleChange}
            {...{ value, placeholder }}
          />
          {isEditing && (
            <>
              <hr className='border-t-[.5px] border-gray-400 mt-3 mb-2 mx-3' />
              <div className='flex justify-end'>
                <button onClick={handleCancel} className='btn-crystal'>
                  cancel
                </button>
                <button onClick={handleSave} className='btn'>
                  save
                </button>
              </div>
            </>
          )}
        </>
      </WithLabel>
    </div>
  );
};

export default TextInput;
