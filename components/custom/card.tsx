import { ICard } from '@/libs/types/brand.types';
import Image from 'next/image';
import Link from 'next/link';

export function Card({ data }: { data: ICard }) {
  return (
    <Link
      href={`/gift-card/${data.id}`}
      className='md:p-5 p-2 border-[0.01875rem] border-[#D9D9D9] rounded-lg md:rounded-[1.875rem] max-w-[320px] mx-auto w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
      <Image
        src={data?.image ?? ''}
        width={280}
        className='w-full rounded-lg md:rounded-[1.875rem] aspect-[0.5] md:h-[140px] object-center'
        height={140}
        alt=''
      />
      <div className=' border-black mt-3 md:mt-6'>
        <p className='text-black text-sm md:text-base text-left font-normal font-dm-sans'>
          {data.brand_name}
        </p>
      </div>
    </Link>
  );
}
