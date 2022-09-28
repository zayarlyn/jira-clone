import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const InputWithValidation = (props: Props) => {
  const { register, error, placeholder, label, defaultValue, readonly } = props;
  return (
    <div className='w-[16.5rem]'>
      <label className='text-sm text-c-6'>{label}</label>
      <input
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        readOnly={readonly}
        className='block w-full mt-2 px-3 text-c-6 text-sm py-1 bg-c-7 border-2 outline-none border-transparent focus:border-chakra-blue duration-200 hover:bg-c-8 focus:bg-c-1'
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
  readonly?: boolean;
};
