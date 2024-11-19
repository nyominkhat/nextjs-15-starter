import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input, InputProps } from '../ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { changeInputValue } from '@/utils/changeInputValue';
import InputLoading from '../loading/InputLoading';

interface CustomizeNumberInput<TFormValues extends FieldValues>
  extends Omit<InputProps, 'form' | 'name'> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  breakLengths: number[];
  maxLengthStyle: 'countAll' | 'countOnlyNumber';
  maxLength: number;
  isLoading?: boolean;
}

type fieldOnChangeTypes = (e: React.ChangeEvent<HTMLInputElement>) => void;

const CustomizeNumberInput = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  breakLengths,
  maxLengthStyle,
  maxLength,
  isLoading = false,
  ...props
}: CustomizeNumberInput<TFormValues>) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: fieldOnChangeTypes) => {
    let value = e.currentTarget.value;

    if (maxLengthStyle === 'countOnlyNumber') {
      // Format the input based on breakLengths
      const formattedValue = changeInputValue(value, breakLengths);

      // Count the number of digits (excluding dashes)
      const digitCount = formattedValue.replace(/-/g, '').length;

      // Check against the maximum digit count
      if (digitCount <= maxLength) {
        e.currentTarget.value = formattedValue;
        onChange(e);
      }
    } else {
      value = changeInputValue(value, breakLengths);

      if (value.length <= maxLength) {
        e.currentTarget.value = value;
        onChange(e);
      }
    }
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

export default CustomizeNumberInput;
