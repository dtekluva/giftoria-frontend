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
      className='group relative block max-w-[320px] mx-auto w-full overflow-hidden rounded-2xl cursor-pointer aspect-[3/2]
        shadow-[0_2px_8px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.1)]
        hover:shadow-[0_14px_32px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.14)]
        hover:-translate-y-1.5
        transition-all duration-300 ease-out'>
      <Image
        src={imgSrc}
        fill
        sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
        className='object-cover transition-transform duration-500 group-hover:scale-105'
        alt={data.brand_name}
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-bl from-black/50 via-transparent to-transparent' />

      {/* Shimmer sweep on hover */}
      <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none' />

      <div className='absolute top-3 right-3 bg-gradient-to-r from-[#c9a84c] to-[#f0d060] text-[#3b1f00] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm'>
        Gift Card
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-3 md:p-4'>
        <p className='text-white text-sm md:text-base font-semibold font-dm-sans drop-shadow-sm truncate'>
          {data.brand_name}
        </p>
      </div>
    </Link>
  );
}
