import { useState } from 'react';
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
  max: number;
  apiFunc: (data: DispatchMiddleware) => void;
}

const TextareaInput = (props: Props) => {
  const { type, label, defaultValue: dv, placeholder, apiFunc, className, isRequired, max } = props;
  const [value, setValue] = useState(dv ?? '');

  const handleSave = () => {
    if (value === dv || (!value && isRequired) || value.length > max) return;
    apiFunc({ type, value });
  };

  return (
    <WithLabel label={label ?? ''} labelClass={`sm:ml-3 ${label === 'Title' ? 'sm:hidden' : ''}`}>
      <>
        <RTAutosize
          className={`border-stale-100 h-fit w-full resize-none rounded-[3px] border-2 px-3 py-1 text-gray-800 outline-none hover:bg-[#f4f5f7] focus:border-chakra-blue sm:border-transparent sm:py-2 ${
            className ?? 'font-medium'
          }`}
          onChange={(e) => setValue(e.target.value)}
          minRows={1}
          {...{ value, placeholder }}
        />
        {value && value !== dv && (
          <>
            <hr className='mx-3 mt-[14px] mb-2 border-t-[.5px] border-gray-400' />
            <div className='relative flex justify-end'>
              <span
                className={`absolute -top-7 right-0 text-sm italic  ${
                  value.length > max ? 'text-red-400' : 'text-gray-800'
                }`}
              >
                {value.length > max ? (
                  'max length exceeded'
                ) : (
                  <>{max - value.length} characters left</>
                )}
              </span>
              <button onClick={() => setValue(dv)} className='btn-crystal'>
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
  );
};

export default TextareaInput;
