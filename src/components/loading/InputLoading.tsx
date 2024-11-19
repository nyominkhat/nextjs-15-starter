import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

interface InputLoadingProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

const InputLoading: React.FC<InputLoadingProps> = ({ className }) => {
  return <Skeleton className={cn('h-9 w-full rounded-md', className)} />;
};

export default InputLoading;
