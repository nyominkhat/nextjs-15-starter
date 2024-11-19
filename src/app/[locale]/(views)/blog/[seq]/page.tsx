'use client';

import React from 'react';
import parser from 'html-react-parser';
import { format, parseISO } from 'date-fns';

import { useGetBlog } from '@/services/blog';
import { SERVER_URL } from '@/utils/constants';

interface BlogDetailPageProps {
  params: {
    seq: string;
  };
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const { seq } = params;

  const { data, isLoading } = useGetBlog({
    seq,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const createdDate = parseISO(data?.content?.createdDate!);
  const formattedDate = format(createdDate, 'yyyy.MM.dd');

  return (
    <div className="!-mt-20 overflow-x-hidden">
      <div className="relative flex h-[80vh] w-screen flex-col items-center justify-end bg-cover bg-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${SERVER_URL}${data?.content.attachments[0].url})`,
            filter: 'blur(3px)',
            zIndex: 0,
          }}
        />

        <div className="relative z-10 mb-10 w-2/3 space-y-5 text-center leading-6 text-white">
          <p className="text-xl font-normal text-white/80">Success Case</p>
          <h1 className="text-6xl font-semibold">
            LG유플러스, 앰플리튜드로 데이터가 흐르는 조직 문화 만들기
          </h1>

          <div className="flex items-center justify-center gap-10">
            <p className="text-lg font-light text-white/90">{formattedDate}</p>
            <p className="text-lg font-light text-white/90">By Chaigun Jung</p>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-20 w-fit">
        {data?.content?.description && parser(data?.content?.description)}
      </section>
    </div>
  );
};

export default BlogDetailPage;
