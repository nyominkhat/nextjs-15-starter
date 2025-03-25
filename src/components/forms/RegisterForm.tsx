'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import NormalInput from '@/components/useForms/NormalInput';
import CustomizePhoneInput from '@/components/useForms/CustomizePhoneInput';
import { useRegister } from '@/services/auth';

const formSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Username is required.',
    }),
    phone: z.string().min(1, {
      message: 'Phone Number is required.',
    }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long!')
      .refine((value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value);
        return hasUpperCase && hasSpecialCharacter;
      }, 'Not a strong password!'),
    confirmPassword: z.string().min(1, 'Confirm password is required!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
  const { mutate } = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = (values: z.infer<typeof formSchema>) => {
    const { confirmPassword, ...rest } = values;

    mutate(
      { ...rest },
      {
        onSuccess: () => {
          signIn('credentials', {
            redirect: false,
            password: form.getValues('password'),
            username: form.getValues('username'),
          })
            .then((response) => {
              if (response?.error) {
                window.alert(response.error);
              }
            })
            .finally(() => {
              form.reset();
              window.sessionStorage.clear();
            });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-5">
        {/* Username  */}
        <NormalInput
          className="h-11"
          form={form}
          name="username"
          label="Username"
          placeholder="username"
        />

        <NormalInput
          className="h-11"
          form={form}
          name="phone"
          label="Phone Number"
          placeholder="phone number"
        />
        {/* Password  */}
        <div className="flex flex-col gap-4">
          <NormalInput
            className="h-11"
            form={form}
            name="password"
            type="password"
            label="Password"
            placeholder="password"
          />

          <NormalInput
            className="h-11"
            form={form}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="confirm password"
          />
        </div>

        {/* Submit  */}
        <Button className="mt-3 h-11 w-full text-[16px]">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
