import { Input, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const InputWithValidation = ({ register, error, placeholder, label, defaultValue }: Props) => {
  return (
    <div>
      <Text as='label' fontSize='sm'>
        {label}
      </Text>
      <Input
        defaultValue={defaultValue ?? ''}
        size='sm'
        mt={1}
        variant='filled'
        placeholder={placeholder}
        {...register}
      />
      <Text as='span' fontSize={13} color='red.300'>
        {error?.message?.toString()}
      </Text>
    </div>
  );
};

export default InputWithValidation;

type Props = {
  register: UseFormRegisterReturn;
  error: FieldError;
  placeholder: string;
  label: string;
  defaultValue?: string;
};
