'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import LinkItem from '@/components/LinkItem';
import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';

import { cn } from '@/lib/utils';

import { MENU, useGetMenuList } from '@/services/menu';
import { SiteInfoType } from '@/services/site-info';
import { SERVER_URL } from '@/utils/constants';

export interface CustomMenuTypes extends MENU {
  children: MENU[] | [];
}

interface HeaderProps {
  data: SiteInfoType | undefined;
}

const Header: React.FC<HeaderProps> = ({ data: sideData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(0);

  const { data } = useGetMenuList();
  const logoImage = sideData?.content?.atchHeader?.url
    ? `${SERVER_URL}${sideData?.content?.atchHeader?.url}`
    : null;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;

      if (scrollYRef.current !== progress) {
        scrollYRef.current = progress;
        setScrollY(progress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menus: CustomMenuTypes[] | [] | undefined = useMemo(() => {
    if (data) {
      const filteredMenus = data?.data?.filter((menu) => {
        return menu.parentSeq === 0 && menu.authYn !== 'Y' && menu.showYn === 'Y';
      });

      return filteredMenus.map((item) => ({
        ...item,
        children: data?.data?.filter((m) => m.parentSeq === item.seq),
      }));
    }
    return [];
  }, [data]);

  useLayoutEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => setIsScrolled(window.scrollY > 50));
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={cn('fixed left-0 right-0 top-0 z-50 bg-secondary shadow duration-200', {
          'bg-primary text-primary-foreground': isScrolled,
        })}
      >
        {/* Scroll border-top percent */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${scrollY}%`,
            height: '4px',
            backgroundColor: '#0a69ff99',
            transition: '0.1s ease-in-out',
          }}
        />

        <div className="container mx-auto flex h-20 items-center justify-between px-10 duration-0 xl:px-16">
          <div className="flex items-center justify-between gap-10">
            {/* Logo */}
            <Link href="/">
              <figure className="relative h-full w-full overflow-hidden rounded">
                {logoImage && (
                  <Image src={logoImage} alt="header-logo" width={150} height={33} loading="lazy" />
                )}
              </figure>
            </Link>

            {/* Navbar links */}
            <ul className="flex items-center gap-5">
              {menus?.map((item) => <LinkItem key={item.seq} data={item} />)}
            </ul>
          </div>

          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">홈 바로가기</Link>
            </Button>

            <Button variant={isScrolled ? 'secondary' : 'default'} asChild>
              <Link href="/">도입 문의하기</Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
