'use client';
import { ICard } from '@/libs/types/brand.types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const FALLBACK_IMAGE = 'https://placehold.co/280x140.png?text=Gift+Card';

export function Card({ data }: { data: ICard }) {
  const [imgSrc, setImgSrc] = useState(data?.image || FALLBACK_IMAGE);

  return (
    <Link
      href={`/gift-card/${data.id}`}
      className='md:p-5 p-2 border-[0.01875rem] border-[#D9D9D9] rounded-lg md:rounded-[1.875rem] max-w-[320px] mx-auto w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
      <Image
        src={imgSrc}
        width={280}
        className='w-full rounded-lg md:rounded-[1.875rem] aspect-video md:aspect-[0.5] h-[90px] md:h-[140px] object-cover'
        height={140}
        alt={data.brand_name}
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />
      <div className='border-black mt-3 md:mt-6'>
        <p className='text-black text-sm md:text-base text-left font-normal font-dm-sans'>
          {data.brand_name}
        </p>
      </div>
    </Link>
  );
}
