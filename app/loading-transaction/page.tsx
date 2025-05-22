import { TextShimmer } from '@/components/ui/text-shimmer';
import Image from 'next/image';
import React from 'react';

function LoadingTransactions() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <div className='flex justifyc-center flex-col items-center'>
        <Image
          src={'/assets/loading-transaction.png'}
          alt='Loading'
          width={800}
          height={400}
        />
        <TextShimmer
          className='text-center md:text-3xl text-xl font-semibold font-dm-sans -mt-10 md:-mt-28'
          duration={1.2}>
          Loading...
        </TextShimmer>
        <p className='font-dm-sans mt-1'>Processing... This won’t take long!</p>
      </div>
    </div>
  );
}

export default LoadingTransactions;
