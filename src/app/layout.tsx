import { roboto, rubik } from '@/utils/font';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/sonner';

import { QueryProvider } from '@/providers/query-provider';

const montserrat = Montserrat({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html suppressHydrationWarning={true}>
      {/* Font from utils/font you can modify font in that file and add font variable in tailwind.config */}
      <body
        className={`${roboto} ${rubik} ${montserrat.className}`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>{children}</QueryProvider>

        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
