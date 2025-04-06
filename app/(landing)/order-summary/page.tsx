import FilterSearchIcon from '@/components/icon/filter-search-icon';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function OrderSummary() {
  return (
    <div className='container mx-auto p-4 mt-2 md:mt-8'>
      <div className='lg:flex justify-between items-center'>
        <h1 className='md:text-2xl font-bold text-base'>Order Summary</h1>
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
      <ul className='mt-4 md:mt-6'>
        <li>
          <div className='flex items-center gap-4 font-montserrat'>
            <Image
              src={'https://placehold.co/160x100.png'}
              width={160}
              height={100}
              alt=''
            />
            <div>
              <p className='text-sm font-medium'>Zara gift card</p>
              <p className='text-[8px] md:text-xs font-dm-sans mt-4'>
                Inyang Kpongete
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default OrderSummary;
