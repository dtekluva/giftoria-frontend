import FilterSearchIcon from '@/components/icon/filter-search-icon';
import SearchIcon from '@/components/icon/search-icon';
import Image from 'next/image';
import React from 'react';

function MyOrderPage() {
  return (
    <div className='container mx-auto p-4 mt-2 md:mt-8'>
      <div className='lg:flex justify-between items-center'>
        <h1 className='md:text-2xl font-bold text-base font-dm-sans'>
          My Order
        </h1>
        <div className='p-3 pl-3 px-5 border rounded-[12px] border-[#E2E6EE] flex gap-2 items-center max-w-[90%] mx-auto mt-4 lg:mt-0 lg:max-w-[290px] lg:mx-0'>
          <div>
            <SearchIcon />
          </div>
          <input
            placeholder='Search'
            className='border-0 focus:border-0 focus:outline-none focus:ring-0 flex-1'
          />
          <div className='pl-4 border-l border-[#93A3C0]'>
            <FilterSearchIcon />
          </div>
        </div>
      </div>
      <ul className='mt-4 md:mt-6 space-y-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className='flex items-center justify-between  gap-2 md:gap-4 pb-6 border-b'>
            <div className='flex items-center gap-4 font-montserrat'>
              <Image
                src={'https://placehold.co/160x100.png'}
                width={160}
                height={100}
                className='max-[380px]:w-[100px]'
                alt=''
              />
              <p className='md:text-sm text-[10px] font-medium'>
                Zara gift card
              </p>
            </div>
            <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
              <div className='md:flex-none flex-1 text-end'>
                <p className='font-dm-sans text-xs md:text-sm font-medium'>
                  GFT - XYZ123456
                </p>
                <p className='text-xs md:text-base font-bold mt-8 md:mt-[57px]'>
                  ₦30000
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrderPage;
