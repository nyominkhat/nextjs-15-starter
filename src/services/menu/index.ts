import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export interface MENU {
  authYn: 'N' | 'Y' | null;
  depth: string | null;
  menuDesc: string | null;
  menuDescEn: string | null;
  menuId: string;
  menuName: string;
  menuNameKr: string | null;
  menuUrl: string;
  parentSeq: number;
  positionType: string | null;
  seq: number;
  showYn: 'Y' | 'N' | null;
}

export const useGetMenuList = () => {
  return useQuery({
    queryKey: ['menu-list'],
    queryFn: () => api.get<{ data: MENU[] }>(`web/menu/list`),
  });
};
