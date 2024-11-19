import React from 'react';
import Image from 'next/image';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

import { Skeleton } from '@/components/ui/skeleton';

import { parseEleText, stringCutter } from '@/utils/stringFormatters';
import { SERVER_URL } from '@/utils/constants';
import { BlogType } from '@/services/blog';
import { Link } from '@/i18n/routing';

interface BlogCardProps {
  data: BlogType;
}

const BlogCard: React.FC<BlogCardProps> & { Skeleton: React.FC } = ({ data }) => {
  const createdDate = parseISO(data.createdDate);
  const formattedDate = format(createdDate, 'yyyy.MM.dd');
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <article className="flex w-full flex-col justify-between gap-6">
      <div className="space-y-4">
        <figure className="relative h-[200px] w-full overflow-hidden rounded">
          <Image
            src={`${SERVER_URL}${data.attachments[0].url}`}
            alt={data.title}
            fill
            sizes="238px"
            className="object-cover"
            loading="eager"
            priority={true}
          />
        </figure>

        <Link
          href={`/blog/${data.seq}`}
          className="block text-lg font-medium text-primary underline-offset-4 hover:underline"
        >
          {data.title}
        </Link>

        <p className="text-sm font-light text-muted-foreground">
          {stringCutter(parseEleText(data.description))}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground/80">
        <span>{formattedDate}</span> <span>{timeAgo}</span>
      </div>
    </article>
  );
};

BlogCard.Skeleton = () => {
  return (
    <article className="flex w-full flex-col justify-between gap-10">
      <div className="space-y-4">
        <figure className="relative h-[200px] w-full overflow-hidden rounded">
          <Skeleton className="h-full w-full" />
        </figure>

        <div className="block text-lg font-medium text-primary">
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="text-sm font-light text-muted-foreground">
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground/80">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    </article>
  );
};

export default BlogCard;
