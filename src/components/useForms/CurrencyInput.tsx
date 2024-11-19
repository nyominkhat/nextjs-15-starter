import React, { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import { formatCurrency } from '@/utils/changeInputValue';
import InputLoading from '../loading/InputLoading';

interface CurrencyInputProps<TFormValues extends FieldValues>
  extends Omit<InputProps, 'form' | 'name'> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  isLoading?: boolean;
}

type fieldOnChangeTypes = (e: React.ChangeEvent<HTMLInputElement>) => void;

const CurrencyInput = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  isLoading = false,
  ...props
}: CurrencyInputProps<TFormValues>) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: fieldOnChangeTypes) => {
    let value = e.currentTarget.value;

    value = formatCurrency(value);

    e.currentTarget.value = value;

    onChange(e);
  };

  if (isLoading) {
    return <InputLoading />;
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              value={field.value || ''}
              onChange={(e) => {
                handleOnChange(e, field.onChange);
              }}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CurrencyInput;
