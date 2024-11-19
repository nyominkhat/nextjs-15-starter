import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { InputProps } from '../ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { PhoneInput } from '../ui/customs/phone-input';
import InputLoading from '../loading/InputLoading';

interface PhoneNumberProps<TFormValues extends FieldValues>
  extends Omit<InputProps, 'form' | 'name'> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  isLoading?: boolean;
}

const CustomizePhoneInput = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  isLoading = false,
}: PhoneNumberProps<TFormValues>) => {
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
            <PhoneInput {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomizePhoneInput;
