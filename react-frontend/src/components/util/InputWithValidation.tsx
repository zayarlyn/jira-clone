import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const InputWithValidation = (props: Props) => {
  const { register, error, placeholder, label, defaultValue, readOnly, autoFocus } = props;
  return (
    <div className=''>
      <label className='text-sm text-c-6 tracking-wide'>{label}</label>
      <input
        defaultValue={defaultValue ?? ''}
        className='block w-full mt-2 px-3 text-c-text-1 rounded-sm text-sm py-[3px] bg-c-7 border-2 outline-none border-transparent focus:border-chakra-blue duration-200 hover:bg-c-8 focus:bg-c-1'
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
};
