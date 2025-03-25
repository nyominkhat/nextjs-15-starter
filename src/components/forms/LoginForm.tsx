'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import NormalInput from '@/components/useForms/NormalInput';
import { Checkbox } from '@/components/ui/checkbox';

import { Link } from '@/i18n/routing';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Password must br at least 2 characters',
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    console.log(values);

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
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-5">
        {/* Username  */}
        <NormalInput className="h-11" form={form} name="username" label="Username" />

        {/* Password  */}
        <div className="flex flex-col gap-4">
          <NormalInput
            className="h-11"
            form={form}
            name="password"
            type="password"
            label="Password"
          />

          {/* Checkbox  */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 text-sm">
                <Checkbox className="h-[20px] w-[20px]" />
                {/* Save ID */}
                <span className="tracking-[-2px]">아이디저장</span>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Checkbox className="h-[20px] w-[20px]" />
                {/* Automatic login */}
                <span className="tracking-[-2px]">자동로그인</span>
              </div>
            </div>

            {/* Find id / password  */}
            <Link href={'/'}>
              <span className="tracking-tight underline">Find ID/Password</span>
            </Link>
          </div>
        </div>
        {/* Submit  */}
        <Button className="mt-3 h-11 w-full text-[16px]">LOGIN</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
