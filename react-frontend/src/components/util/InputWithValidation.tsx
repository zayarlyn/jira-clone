import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const InputWithValidation = (props: Props) => {
  const {
    darkEnabled = false,
    register,
    error,
    placeholder,
    label,
    defaultValue,
    readOnly,
    autoFocus,
    inputClass,
    type,
  } = props;
  return (
    <div>
      <label className={`text-sm tracking-wide ${darkEnabled ? 'text-c-5' : 'text-gray-800'}`}>
        {label}
      </label>
      <input
        defaultValue={defaultValue ?? ''}
        className={`block w-full focus:border-chakra-blue mt-2 px-3 rounded-sm text-sm py-[3px] border-2 duration-200 outline-none ${
          darkEnabled
            ? 'hover:bg-c-7 focus:bg-c-1 bg-c-6 text-c-text'
            : 'bg-slate-100 hover:border-gray-400'
        } ${inputClass ?? ' border-transparent'} ${readOnly ? 'pointer-events-none' : ''}`}
        {...{ placeholder, readOnly, autoFocus, type }}
        {...register}
      />
      <span className='text-[13px] text-red-400'>{error?.message?.toString()}</span>
    </div>
  );
};

export default InputWithValidation;

type Props = {
  register: UseFormRegisterReturn;
  error: FieldError;
  placeholder?: string;
  label: string;
  defaultValue?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  darkEnabled?: boolean;
  inputClass?: string;
  type?: string;
};
