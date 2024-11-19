'use client';

import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { useGetSiteInfo } from '@/services/site-info';
import { SERVER_URL } from '@/utils/constants';

interface SideLayoutProps {
  children: React.ReactNode;
}

const SideLayout: React.FC<SideLayoutProps> = ({ children }) => {
  const { data, isLoading } = useGetSiteInfo();

  useEffect(() => {
    if (data?.content?.atchFav) {
      const faviconLink =
        (document.querySelector("link[rel~='icon']") as HTMLLinkElement) ||
        document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.href = `${SERVER_URL}${data.content.atchFav.url}`;
      document.head.appendChild(faviconLink);
    }
  }, [data]);

  return (
    <main className="flex flex-col">
      <Header data={data} />
      <section className="mt-20 min-h-screen">{children}</section>
      <Footer data={data} />
    </main>
  );
};

export default SideLayout;
