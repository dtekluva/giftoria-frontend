import Image from 'next/image';
import React from 'react';

function GiftCardPage() {
  return (
    <div className='md:py-10 md:px-10 px-4 py-5 container mx-auto'>
      <div className='bg-pink-100 rounded-[8px] py-4 px-10 md:py-7'>
        <h1 className='text-center text-sm md:text-3xl font-semibold'>
          Explore our collection of our gift cards
        </h1>
        <p className='text-center font-dm-sans md:mt-2 text-[10px] md:text-xl'>
          Gift you love ones with gift they truely desire
        </p>
      </div>
      <div className='grid md:mt-10 mt-3 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]  md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] container mx-auto'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='p-5 border-[0.01875rem] border-[#D9D9D9] rounded-[1.875rem] mx-auto w-full'>
            <Image
              src={'https://placehold.co/280x140.png'}
              width={280}
              className='w-full'
              height={140}
              alt=''
            />
            <div className=' border-black mt-6'>
              <p className='text-black text-base text-left font-normal font-montserrat'>
                Zara gift card
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftCardPage;
