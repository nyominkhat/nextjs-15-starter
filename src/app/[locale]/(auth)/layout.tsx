import React from 'react';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
// import '../../globals.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const AuthLayout: React.FC<AuthLayoutProps> = async ({ children, params: { locale } }) => {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}> {children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default AuthLayout;
