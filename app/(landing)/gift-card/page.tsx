'use client';
import { Card } from '@/components/custom/card';
import {
  useGetAllBrandCardsQuery,
  useGetCategoriesQuery,
} from '@/services/queries/brand.queries';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

function GiftCardPage() {
  const userSearch = useSearchParams().get('search');
  const [category] = useQueryState('category', parseAsString);
  const router = useRouter();

  const { query: categoriesQuery } = useGetCategoriesQuery();
  const categories = categoriesQuery.data?.results || [];

  const { query } = useGetAllBrandCardsQuery({
    search: userSearch ?? '',
    showAllCards: true,
    category: category ?? '',
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
              className='p-6 border border-gray-100 rounded-[20px] max-w-[320px] mx-auto w-full animate-pulse bg-white shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-full h-[160px] bg-gray-200 rounded-[12px]'></div>
              <div className='mt-6 space-y-3'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          ))}
        {query?.data?.results.map((data, index) => (
          <Card key={index} data={data} />
        ))}

        {query?.data?.results.length === 0 && !query.isPending && (
          <div className='col-span-full flex flex-col mt-4 font-dm-sans items-center justify-center px-4'>
            <div className='relative w-32 h-32 mb-8'>
              <div className='absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full animate-pulse'></div>
              <div className='absolute inset-4 bg-white rounded-full flex items-center justify-center'>
                <Search className='w-12 h-12 text-pink-400' />
              </div>
            </div>

            <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center'>
              No Gift Cards Found
            </h2>

            <p className='text-gray-600 text-center max-w-md mb-8'>
              {userSearch ? (
                <>
                  We couldn&apos;t find any gift cards matching &quot;
                  {userSearch}&quot;.
                  <br />
                  Try different keywords or browse our categories.
                </>
              ) : (
                <>
                  Looks like we&apos;re currently updating our gift card
                  collection.
                  <br />
                  Check back soon for new additions!
                </>
              )}
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                variant='outline'
                className='px-6 py-2 border-pink-200 text-pink-600 hover:bg-pink-50'
                onClick={() => router.push('/gift-card')}>
                Browse All Categories
              </Button>
              <Button
                className='px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90'
                onClick={() => router.push('/gift-card')}>
                View All Gift Cards
              </Button>
            </div>

            <div className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl'>
              {categories &&
                categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      router.push(`/gift-card?category=${cat?.category_name}`)
                    }
                    className='p-4 cursor-pointer rounded-lg bg-white border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all text-sm font-medium text-gray-700'>
                    {cat?.category_name}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GiftCardPage;
