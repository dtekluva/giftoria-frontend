import { ICard } from '@/libs/types/brand.types';
import Image from 'next/image';
import Link from 'next/link';

export function Card({ data }: { data: ICard }) {
  return (
    <Link
      href={`/gift-card/${data.id}`}
      className='p-5 border-[0.01875rem] border-[#D9D9D9] rounded-[1.875rem] max-w-[320px] mx-auto w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'>
      <Image
        src={data?.image ?? ''}
        width={280}
        className='w-full rounded-[1.875rem] h-[140px] object-cover'
        height={140}
        alt=''
      />
      <div className=' border-black mt-6'>
        <p className='text-black text-base text-left font-normal font-montserrat'>
          {data.brand_name}
        </p>
      </div>
    </Link>
  );
}
