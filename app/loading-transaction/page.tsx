import HomeIcon from '@/components/icon/home-icon';
import { TextShimmer } from '@/components/ui/text-shimmer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function LoadingTransactions() {
  return (
    <div className='flex flex-col h-screen w-full'>
      <Link
        href={'/'}
        className='bg-[#4A014A] flex rounded-full h-fit my-4 ml-auto mr-8 py-2 px-6 gap-2'>
        <HomeIcon />
        <p className='text-[#D9D9D9] font-semibold font-nunito'>Home</p>
      </Link>
      <div className='flex self-center max-w-fit mx-auto justify-center flex-col items-center'>
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
