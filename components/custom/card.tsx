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
      className='group relative block max-w-[320px] mx-auto w-full cursor-pointer rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-lg hover:shadow-[0_8px_32px_rgba(255,0,102,0.25)] hover:-translate-y-1 hover:border-white/40 transition-all duration-300'>
      <Image
        src={imgSrc}
        width={280}
        height={160}
        className='w-full h-[100px] md:h-[160px] object-cover transition-transform duration-500 group-hover:scale-105'
        alt={data.brand_name}
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />
      {/* Frosted glass info bar */}
      <div className='px-3 py-2 md:px-4 md:py-3 bg-white/5 border-t border-white/15'>
        <p className='text-white text-sm md:text-base font-semibold font-dm-sans truncate'>
          {data.brand_name}
        </p>
        <p className='text-[10px] md:text-xs text-pink-300 font-semibold uppercase tracking-wide mt-0.5'>
          Gift Card
        </p>
      </div>
    </Link>
  );
}
