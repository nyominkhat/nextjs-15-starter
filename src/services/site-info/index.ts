import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';
import { AttachmentTypes } from '@/types';

export interface SiteInfoType {
  content: {
    accountHolder: string;
    accountNumber: string;
    addr: string;
    addrEtc: string;
    atchFav: AttachmentTypes;
    atchFooter: AttachmentTypes;
    atchHeader: AttachmentTypes;
    atchHeaderMn: AttachmentTypes;
    bank: string;
    ceoName: string;
    companyName: string;
    companyRegistrationNumber: string;
    contactEmail: string;
    contactMobile: string;
    contactTel: string;
    copyright: string;
    createdBy: string | null;
    createdDate: string;
    createdIp: string | null;
    favFileGroupSeq: number;
    footerContent: string;
    footerFileGroupSeq: number;
    formattedCreateDate: string;
    formattedCreateTimestamp: string;
    formattedModifiedDate: string;
    formattedModifyTimestamp: string;
    headerFileGroupSeq: number;
    headerMnFileGroupSeq: number;
    isDeleted: 'Y' | 'N';
    modifiedBy: string | null;
    modifiedDate: string | null;
    modifiedIp: string | null;
    opOrderNumber: string;
    privacyPolicy: string;
    siteNm: string;
    siteSeq: number;
    siteUrl: string;
    termsUse: string;
    zip: string;
  };
  message: string;
  status: number;
}

export const useGetSiteInfo = () => {
  return useQuery({
    queryKey: ['site-info'],
    queryFn: () => api.get<SiteInfoType>(`web/site/info`),
  });
};
