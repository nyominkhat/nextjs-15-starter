'use client';

import React from 'react';
import Image from 'next/image';

import { SERVER_URL } from '@/utils/constants';
import { useGetMain } from '@/services/main';

const MainBanner = () => {
  const { data, isLoading } = useGetMain();

  const bannerPCImage = data?.banners?.[0]?.pcImageAtch?.[0]?.url
    ? `${SERVER_URL}${data?.banners?.[0]?.pcImageAtch?.[0]?.url}`
    : null;

  const bannerMobileImage = data?.banners?.[0]?.mobileImageAtch?.[0]?.url
    ? `${SERVER_URL}${data?.banners?.[0]?.mobileImageAtch?.[0]?.url}`
    : null;

  return (
    <section className="h-[70vh] w-full overflow-hidden">
      <div className="hidden md:block">
        {bannerPCImage && (
          <Image
            src={bannerPCImage}
            alt="hero-img"
            width={1000}
            height={500}
            className="h-full w-full object-cover"
            priority={true}
          />
        )}
      </div>

      <div className="block md:hidden">
        {bannerMobileImage && (
          <Image
            src={bannerMobileImage}
            alt="hero-img"
            width={500}
            height={500}
            className="h-full w-full object-cover"
            priority={true}
          />
        )}
      </div>
    </section>
  );
};

export default MainBanner;
