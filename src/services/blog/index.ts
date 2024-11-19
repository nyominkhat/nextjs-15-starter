import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';
import { AttachmentTypes, BasicAPIReturn } from '@/types';

export interface BlogType {
  seq: number;
  createdBy: number;
  createdDate: string;
  createdIp: string;
  description: string;
  detailFileGroupSeq: number;
  exposureYn: 'Y' | 'N';
  fileGroupSeq: number;
  formattedCreateDate: string;
  formattedCreateTimestamp: string;
  formattedModifiedDate: string;
  formattedModifyTimestamp: string;
  isDeleted: 'Y' | 'N';
  modifiedBy: number;
  modifiedDate: string;
  modifiedIp: string;
  regDate: string;
  title: string;
  viewCnt: string;
  attachments: AttachmentTypes[];
}

export interface BlogListAPIResponse extends BasicAPIReturn {
  content: BlogType[];
}

export const useGetBlogs = ({ page = 0, size = 10 }: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ['blogs', { page, size }],
    queryFn: () =>
      api.get<BlogListAPIResponse>('web/news/list', {
        page,
        size,
      }),
  });
};

export const useGetBlog = ({ seq }: { seq: string }) => {
  return useQuery({
    queryKey: ['blog', { seq }],
    queryFn: () =>
      api.get<{ content: BlogType; message: string; status: number }>(`web/news/detail`, {
        seq,
      }),
  });
};
