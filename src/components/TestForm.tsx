'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useState } from 'react';

import { Form } from '@/components/ui/form';
import NormalInput from '@/components/useForms/NormalInput';
import CurrencyInput from '@/components/useForms/CurrencyInput';
import CustomizeNumberInput from '@/components/useForms/CustomizeNumberInput';
import { Button } from '@/components/ui/button';
import CustomizePhoneInput from '@/components/useForms/CustomizePhoneInput';
import AddressInputGroup from '@/components/useForms/AddressInputGroup';

const formSchema = z.object({
  password: z.string().trim().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  currency: z.string().trim().min(2, {
    message: 'Currency is required!',
  }),
  register: z.string().trim().min(5, { message: 'Register number length must be at least 5 !' }),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
  zip: z.string().trim().min(1, { message: 'Zip code is required.' }),
  addr: z.string().trim().min(1, { message: 'Address is required.' }),
  addrEtc: z.string().trim().min(1, { message: 'Additional address info is required.' }),
});

const TestForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      currency: '',
      register: '',
      phone: '',
      zip: '',
      addr: '',
      addrEtc: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <NormalInput form={form} name="password" type="password" label="Password" />

        <CurrencyInput form={form} name="currency" label="Currency" />

        <CustomizeNumberInput
          form={form}
          name="register"
          label="Registration number"
          maxLength={14}
          maxLengthStyle={'countOnlyNumber'}
          breakLengths={[2, 2]}
        />

        <CustomizePhoneInput form={form} name="phone" label="Phone number" />

        <AddressInputGroup form={form} label="Address" />

        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default TestForm;
