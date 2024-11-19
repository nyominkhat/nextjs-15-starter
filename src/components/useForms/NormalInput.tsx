import React, { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import { CustomPasswordInput } from '@/components/ui/customs/password-input';
import InputLoading from '../loading/InputLoading';

interface NormalInputProps<TFormValues extends FieldValues>
  extends Omit<InputProps, 'form' | 'name'> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  isLoading?: boolean;
}

const NormalInput = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  isLoading = false,
  ...props
}: NormalInputProps<TFormValues>) => {
  if (isLoading) {
    return <InputLoading className={''} />;
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'password' ? (
              <CustomPasswordInput {...field} {...props} />
            ) : (
              <Input type={type} {...field} {...props} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NormalInput;
