'use client';

import React from 'react';

interface SideLayoutProps {
  children: React.ReactNode;
}

const SideLayout: React.FC<SideLayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col">
      <section className="mt-20 min-h-screen">{children}</section>
    </main>
  );
};

export default SideLayout;
