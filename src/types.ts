export interface BasicAPIReturn {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    paged: number;
    unpaged: number;
    offset: number;
    pageNumber: number;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface AttachmentTypes {
  createDt: null;
  deleteUrl: string;
  downCnt: number;
  downloadUrl: string;
  fileExt: string;
  fileGrpId: number;
  fileNm: string;
  fileSeq: number;
  fileSize: number;
  isDeleted: null | 'N' | 'Y';
  storedNm: string;
  storedPath: string;
  subSeq: number;
  url: string;
}
