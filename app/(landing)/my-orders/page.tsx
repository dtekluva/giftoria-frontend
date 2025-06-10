'use client';
import SearchInput from '@/components/custom/search-input';
import ConvertCardIcon from '@/components/icon/convert-card-icon';
import { Button } from '@/components/ui/button';
import { useGetBrandCardSalesQuery } from '@/services/queries/brand.queries';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import NextChevronRightIcon from '@/components/icon/next-chevron-right-icon';
import PreviousChevronLeftIcon from '@/components/icon/previous-chevron-left-icon';
import { MY_ORDER_PAGE_SIZE } from '@/libs/constants';
import { useBuyCardById } from '@/services/mutations/brand.mutation';

function MyOrderPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { query, prefetchQuery } = useGetBrandCardSalesQuery({
    search: '',
    page: currentPage,
    page_size: MY_ORDER_PAGE_SIZE,
  });

  const { buyCard, isBuyingCard } = useBuyCardById();

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className='container mx-auto p-4 mt-2 md:mt-8'>
      <div className='lg:flex justify-between items-center'>
        <h1 className='md:text-2xl font-bold text-base font-dm-sans mb-4 lg:mb-0'>
          My Order
        </h1>
        <SearchInput />
      </div>
      <ul className='mt-4 md:mt-6 space-y-4'>
        {query.isPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className='flex items-center justify-between gap-8 pb-6 border-b flex-wrap animate-pulse'>
              <div className='flex items-center gap-4'>
                {/* Skeleton for the image */}
                <div className='w-[160px] h-[100px] bg-gray-300 rounded-md'></div>
                {/* Skeleton for the brand name */}
                <div className='w-[100px] h-4 bg-gray-300 rounded-md'></div>
              </div>
              <div className='flex flex-col gap-4'>
                {/* Skeleton for the reference */}
                <div className='w-[80px] h-4 bg-gray-300 rounded-md'></div>
                {/* Skeleton for the amount */}
                <div className='w-[60px] h-6 bg-gray-300 rounded-md'></div>
              </div>
              {/* Skeleton for the button */}
              <div className='w-[130px] h-10 bg-gray-300 rounded-md'></div>
            </li>
          ))
        ) : query.data?.results && query.data.results.length > 0 ? (
          query.data.results.map((order, index) => (
            <li
              key={index}
              className='flex items-center justify-between gap-8 pb-6 border-b flex-wrap'>
              <div>
                <div className='flex items-center gap-2 flex-1 md:hidden mb-2'>
                  <ConvertCardIcon width={16} height={16} />
                  <p className='text-[8px] sm:text-xs text-[#990099] font-semibold'>
                    Buy Again
                  </p>
                </div>
                <div className='flex items-center gap-4 font-montserrat'>
                  <Image
                    src={order?.brand_image ?? ''}
                    width={160}
                    height={100}
                    className='max-[380px]:w-[100px]'
                    alt=''
                  />
                  <p className='md:text-sm text-[10px] font-medium'>
                    {order?.brand_name}
                  </p>
                </div>
              </div>
              <div className='md:flex gap-[110px]'>
                <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
                  <div className='md:flex-none flex-1 text-end'>
                    <p className='font-dm-sans text-xs md:text-sm font-medium'>
                      {order.reference}
                    </p>
                    <p className='text-xs md:text-base font-bold mt-5 md:mt-8'>
                      ₦{order.card_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <button
                    type='button'
                    disabled={isBuyingCard}
                    onClick={() => {
                      buyCard({
                        card_id: order.brand,
                      });
                    }}
                    className='flex cursor-pointer items-center gap-2 disabled:opacity-50'>
                    <ConvertCardIcon />
                    <p className='text-base text-[#990099] font-semibold'>
                      Buy Again
                    </p>
                  </button>
                  <Button
                    onClick={() => {
                      router.push(`/order-details/${order.id}`);
                    }}
                    className='mt-4 h-[63px] text-base font-semibold min-w-[200px]'>
                    View order
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push(`/order-details/${order.id}`);
                }}
                className='md:hidden h-10 text-xs font-semibold max-w-[130px] flex-1 ml-auto'>
                View order
              </Button>
            </li>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center py-12 px-4 font-nunito'>
            <div className='w-24 h-24 mb-6'>
              <svg
                className='w-full h-full text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No Orders Yet
            </h3>
            <p className='text-gray-500 text-center mb-6'>
              You haven&apos;t made any orders yet. Start shopping to see your
              orders here.
            </p>
            <Button
              onClick={() => router.push('/')}
              className='bg-[#990099] hover:bg-[#7a007a] text-white px-6 py-2 rounded-md'>
              Start Shopping
            </Button>
          </div>
        )}
      </ul>

      {/* Pagination Controls */}
      {!!query.data?.count && (
        <div className='flex justify-between items-center mt-6'>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`h-10 px-4 text-sm font-medium font-dm-sans ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}>
            <PreviousChevronLeftIcon />
            Previous
          </Button>
          <p className='text-sm text-gray-600'>
            Page {currentPage} of{' '}
            {(query?.data?.count / MY_ORDER_PAGE_SIZE).toFixed(0)}
          </p>
          <Button
            onClick={handleNextPage}
            onMouseEnter={() => {
              if (query?.data?.next) {
                console.log('Prefetching next page');
                prefetchQuery();
              }
            }}
            disabled={!query?.data?.next}
            className={`h-10 px-4 text-sm font-medium font-dm-sans ${
              !query?.data?.next
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}>
            Next <NextChevronRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
}

export default MyOrderPage;
