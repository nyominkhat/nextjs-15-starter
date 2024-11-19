import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export interface MAIN {
  banners: any;
}

export const useGetMain = () => {
  return useQuery({
    queryKey: ['main'],
    queryFn: () => api.get<MAIN>(`web/main`),
  });
};
