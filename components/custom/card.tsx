import { ICard } from '@/libs/types/brand.types';
import Image from 'next/image';

export function Card({ data }: { data: ICard }) {
  return (
    <div className='p-5 border-[0.01875rem] border-[#D9D9D9] rounded-[1.875rem] max-w-[320px] mx-auto w-full'>
      <Image
        src={data.image ?? 'https://placehold.co/280x140.png'}
        width={280}
        className='w-full'
        height={140}
        alt=''
      />
      <div className=' border-black mt-6'>
        <p className='text-black text-base text-left font-normal font-montserrat'>
          {data.brand_name}
        </p>
      </div>
    </div>
  );
}
