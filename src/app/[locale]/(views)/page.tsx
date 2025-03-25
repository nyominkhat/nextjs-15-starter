'use client';

import { useSession } from 'next-auth/react';

import TestForm from '@/components/TestForm';
import PageWrapper from '@/components/PageWrapper';

const Home = () => {
  const { data: session } = useSession();

  console.log('client session => ', session);

  return (
    <>
      <PageWrapper>
        <TestForm />
      </PageWrapper>
    </>
  );
};

export default Home;
