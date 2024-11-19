'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import img from '../../public/not-found.png';

const NotFound = () => {
  return (
    <div className="m-auto flex h-screen flex-col items-center justify-center">
      <h1 className="bg-primary-foreground text-[40px] font-bold tracking-wider md:text-[50px]">
        404 ERROR
      </h1>
      <Image src={img} alt="page not found" width={400} height={400} />

      <div className="t -mt-6 flex flex-col items-center justify-center bg-primary-foreground text-lg font-bold md:text-xl">
        <h1>Opps... Page Not Found</h1>

        <Button asChild className="mt-6">
          <Link href={'/'}>Go Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
