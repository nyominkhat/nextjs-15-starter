'use client';

import React from 'react';

import { useGetBlogs } from '@/services/blog';
import BlogCard from '@/components/cards/BlogCard';

const BlogList = () => {
  const { data, isLoading } = useGetBlogs({
    page: 0,
    size: 10,
  });
  console.log(data)
  return (
    <div className="grid grid-cols-4 gap-10">
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => <BlogCard.Skeleton key={index} />)
        : data?.content.map((item) => <BlogCard key={item.seq} data={item} />)}
    </div>
  );
};

export default BlogList;
