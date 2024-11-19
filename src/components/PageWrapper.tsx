import { cn } from '@/lib/utils';
import React from 'react';

interface PageWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <main className={cn('container mx-auto w-full px-10 py-5 xl:px-16', className)}>
      {children}
    </main>
  );
};

export default PageWrapper;
