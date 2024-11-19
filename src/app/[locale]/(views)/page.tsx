import React from 'react';
import { useTranslations } from 'next-intl';

import TestForm from '@/components/TestForm';
import PageWrapper from '@/components/PageWrapper';
import MainBanner from '@/components/MainBanner';

import { Link } from '@/i18n/routing';

const Home = () => {
  const t = useTranslations('HomePage');

  return (
    <>
      <MainBanner />

      <PageWrapper>
        <TestForm />
      </PageWrapper>
    </>
  );
};

export default Home;
