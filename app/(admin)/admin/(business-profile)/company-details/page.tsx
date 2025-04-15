import Image from 'next/image';
import React from 'react';

function CompanyDetails() {
  return (
    <div className='px-7 pt-7 md:pt-9'>
      <div className='flex items-center gap-[10px] md:gap-7'>
        <Image
          src={'https://placehold.co/100.png'}
          width={100}
          height={100}
          alt='Company Logo'
          className='rounded-full md:h-[100px] md:w-[100px] h-[60px] w-[60px]'
        />
        <div className='space-y-[6px]'>
          <h1 className='text-xs md:text-base font-bold font-montserrat'>
            Upload company logo
          </h1>
          <p className='font-dm-sans text-xs md:text-sm font-medium text-[#344054 md:mt-1'>
            Drag and drop your file(s) here or{' '}
            <span className='font-bold'>Click to upload</span>{' '}
          </p>
          <p className='text-[#344054] md:text-xs text-[10px] font-dm-sans font-medium'>
            Files types: Pdf or Doc, Png. Max file size 10MB
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
