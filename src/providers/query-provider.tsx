'use client';

import React from 'react';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  type QueryKey,
} from '@tanstack/react-query';
import { toast } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

interface QueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage);
      }
    },

    onError: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        toast.success(mutation.meta.errorMessage);
      }
    },

    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidatesQuery) {
        queryClient.invalidateQueries({
          queryKey: mutation.meta?.invalidatesQuery,
        });
      }
    },
  }),
});

// USAGE: src\services\auth\index.ts

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
