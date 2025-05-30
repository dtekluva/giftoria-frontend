'use client';
import { Card } from '@/components/custom/card';
import { useGetAllBrandCardsQuery } from '@/services/queries/brand.queries';
import { useSearchParams } from 'next/navigation';
function GiftCardPage() {
  const userSearch = useSearchParams().get('search');

  const { query } = useGetAllBrandCardsQuery({
    search: userSearch ?? '',
    showAllCards: true,
  });

  return (
    <div className='md:py-10 md:px-10 px-4 py-5 container mx-auto'>
      <div className='bg-pink-100 rounded-[8px] py-4 px-10 md:py-7'>
        <h1 className='text-center text-sm md:text-3xl font-semibold'>
          Explore our collection of our gift cards {userSearch}
        </h1>
        <p className='text-center font-dm-sans md:mt-2 text-[10px] md:text-xl'>
          Gift you love ones with gift they truly desire
        </p>
      </div>
      <div className='grid md:mt-10 mt-3 gap-5 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:px-[3.125rem] container mx-auto px-5'>
        {query.isPending &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='p-5 border-[0.01875rem] border-[#D9D9D9] md:rounded-[1.875rem] max-w-[320px] mx-auto w-full animate-pulse'>
              {/* Image placeholder */}
              <div className='w-full h-[140px] bg-gray-300 rounded-md'></div>

              {/* Text placeholder */}
              <div className='mt-6'>
                <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
              </div>
            </div>
          ))}
        {query?.data?.results.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default GiftCardPage;
