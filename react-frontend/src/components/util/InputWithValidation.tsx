import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const InputWithValidation = (props: Props) => {
  const {
    register,
    error,
    placeholder,
    label,
    defaultValue,
    readOnly,
    autoFocus,
    darkEnabled = true,
  } = props;
  return (
    <div>
      <label className={`text-sm tracking-wide ${darkEnabled ? 'text-c-6' : 'text-gray-800'}`}>
        {label}
      </label>
      <input
        defaultValue={defaultValue ?? ''}
        className={`block w-full focus:border-chakra-blue mt-2 px-3 rounded-sm text-sm py-[3px] border-2 duration-200 outline-none border-transparent ${
          darkEnabled
            ? 'hover:bg-c-8 focus:bg-c-1 bg-c-7 text-c-text-1'
            : 'border-gray-600 bg-slate-100 hover:border-gray-400'
        }`}
        {...{ placeholder, readOnly, autoFocus }}
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
};
