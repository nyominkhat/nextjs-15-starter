import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ucEveryFirstWord } from '@/utils/stringFormatters';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LinkItemProps {
  data: any;
}

const LinkItem: React.FC<LinkItemProps> = ({ data }) => {
  const pathname = usePathname();

  const hasChildren = useMemo(() => Boolean(data.children.length), [data.children.length]);
  const formattedMenuName = useMemo(() => ucEveryFirstWord(data.menuName), [data.menuName]);

  const isActiveLink = useMemo(() => {
    if (hasChildren) {
      return data.children.some((item: any) => item.menuUrl === pathname);
    }
  }, [hasChildren, pathname, data]);

  const renderLinkWithChildren = () => (
    <HoverCard openDelay={300} closeDelay={300}>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className={cn('p-0 text-inherit', {
            underline: isActiveLink,
          })}
        >
          <Link href={data.menuUrl}>{formattedMenuName}</Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <ul>
          {data.children.map((item: any) => {
            return (
              <li key={item.seq}>
                <Button variant="link" asChild>
                  <Link href={item.menuUrl} prefetch={true}>
                    {ucEveryFirstWord(item.menuName)}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <li>
      {hasChildren ? (
        renderLinkWithChildren()
      ) : (
        <Button
          asChild
          variant="link"
          className={cn('p-0 text-inherit', {
            underline: pathname === data.menuUrl,
          })}
        >
          <Link href={data.menuUrl} prefetch={true}>
            {formattedMenuName}
          </Link>
        </Button>
      )}
    </li>
  );
};

export default React.memo(LinkItem);
