'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useMemo } from 'react';

import { stringDashCutter } from '@/utils/stringFormatters';
import { SiteInfoType } from '@/services/site-info';
import { SERVER_URL } from '@/utils/constants';

interface FooterProps {
  data: SiteInfoType | undefined;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const companyRegistrationNumber = useMemo(
    () => stringDashCutter(data?.content?.companyRegistrationNumber),
    [data?.content?.companyRegistrationNumber],
  );

  const footerLogo = data?.content?.atchFooter?.url
    ? `${SERVER_URL}${data?.content?.atchFooter?.url}`
    : null;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex h-auto flex-col items-start justify-center gap-2 px-10 max-sm:py-10 sm:h-96">
        <Link href="/">
          {footerLogo && (
            <Image src={footerLogo} alt="footer-logo" width={150} height={33} loading="lazy" />
          )}
        </Link>
        <p>사업자등록번호: {companyRegistrationNumber}</p>
        <p>TEL: {data?.content?.contactMobile}</p>
        <p>이메일: {data?.content?.contactEmail}</p>
        <p>
          <span className="mr-1">{data?.content?.addr}</span>
          <span>{data?.content?.addrEtc}</span>
        </p>
        <div className="mt-14 w-full border-b" />
        <p className="w-full space-x-4 text-end text-sm font-semibold text-primary-foreground/70">
          <span>Terms and Conditions</span> <span>Privacy Policy</span>
        </p>
        <p className="mt-2 w-full text-center text-sm font-semibold text-primary-foreground/50">
          {data?.content?.copyright}
        </p>
      </div>

      <div></div>
    </footer>
  );
};

export default Footer;
