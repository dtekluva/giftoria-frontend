'use client';
import Table from '@/components/custom/table';
import SearchInput from '@/components/custom/search-input';
import SendIcon from '@/components/icon/send-icon';
import SMSIcon from '@/components/icon/sms-icon';
import SMSNotificationIcon from '@/components/icon/sms-notification-icon';
import SmsStarIcon from '@/components/icon/sms-star-icon';
import { Input } from '@/components/ui/input';
import { BrandCardTransaction } from '@/libs/types/brand.types';
import { useGetCompanyHistory } from '@/services/queries/company.queries';
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import NextChevronRightIcon from '@/components/icon/next-chevron-right-icon';
import PreviousChevronLeftIcon from '@/components/icon/previous-chevron-left-icon';
import { useRouter } from 'next/navigation';

const PAGE_SIZE = 10;

const tableHeaders = [
  { key: 'transaction_id', title: 'Transaction ID' },
  { key: 'card_number', title: 'Card Number' },
  { key: 'amount', title: 'Amount' },
  { key: 'card_value', title: 'Card Value' },
  { key: 'balance', title: 'Balance' },
  { key: 'status', title: 'Status' },
  { key: 'store_address', title: 'Store Address' },
  { key: 'created_at', title: 'Date' },
];

function CashierPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [cardCode, setCardCode] = useState('');

  const { query, prefetchQuery } = useGetCompanyHistory({
    search: searchTerm,
    page: currentPage,
    page_size: PAGE_SIZE,
  });

  console.log(params, 'this area');

  const handleCardCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardCode.trim()) {
      router.push(`/cashier/card-balance/${cardCode.trim()}`);
    }
  };

  const formatTableData = (data: BrandCardTransaction[]) => {
    return data.map((item) => ({
      transaction_id: item.transaction_id,
      card_number: item.card_number,
      amount: `₦${item.amount.toLocaleString()}`,
      card_value: `₦${item.card_value.toLocaleString()}`,
      balance: `₦${item.balance.toLocaleString()}`,
      status: (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : item.status === 'REDEEMED'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
          {item.status}
        </span>
      ),
      store_address: item.store_address,
      created_at: new Date(item.created_at).toLocaleDateString(),
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const responseData = query.data?.data;

  return (
    <div>
      <div className='px-4 pt-6'>
        <h2 className='text-base md:hidden font-semibold'>Gift Card Orders</h2>
        <form
          onSubmit={handleCardCodeSubmit}
          className='flex items-center border py-1 px-1 rounded-[8px] md:mt-0 mt-6 max-w-[400px] mx-auto pr-6'>
          <Input
            type='text'
            value={cardCode}
            onChange={(e) => setCardCode(e.target.value)}
            className='border-none flex-1 md:h-[50px] font-nunito'
            placeholder='Enter gift card unique code'
          />
          <button type='submit' className='cursor-pointer'>
            <SendIcon />
          </button>
        </form>
      </div>
      <div className='md:mt-7 mt-5 border-t-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-10 py-5'>
        <div className='container mx-auto'>
          <div className='max-w-[1200px] grid md:gap-5 gap-4 grid-cols-[repeat(auto-fit,minmax(216px,1fr))]'>
            <div className='md:py-10 py-10 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out items-center bg-[url(/assets/balance-card-bg.png)] text-center'>
              <h5 className='text-sm font-dm-sans font-medium'>
                Total Redeemed card
              </h5>
              <p className='font-sans text-2xl font-semibold'>₦19,000,000</p>
            </div>
            <Card
              title='Redeemed'
              icon={<SmsStarIcon />}
              value={responseData?.status_count.REDEEMED ?? ''}
            />
            <Card
              title='Pending'
              icon={<SMSIcon />}
              value={responseData?.status_count.PENDING ?? ''}
            />
            <Card
              title='Declined'
              icon={<SMSNotificationIcon />}
              value={responseData?.status_count.DECLINED ?? ''}
            />
          </div>
        </div>
      </div>
      <div className='border-t-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-8 py-5'>
        <div className='container mx-auto'>
          <div className='flex md:flex-row flex-col gap-5 md:items-center justify-between'>
            <h3 className='text-base md:text-[1.25rem] font-semibold'>
              Order History
            </h3>
            <SearchInput
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder='Search orders...'
            />
          </div>
        </div>
        <div className='mt-4'>
          {query.isPending ? (
            <div className='animate-pulse'>
              <div className='h-10 bg-gray-200 rounded mb-4'></div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className='h-16 bg-gray-100 rounded mb-2'></div>
              ))}
            </div>
          ) : (
            <Table
              headers={tableHeaders}
              data={
                responseData?.results
                  ? formatTableData(responseData.results)
                  : []
              }
              emptyStateMessage='No gift card transactions found'
            />
          )}
        </div>

        {/* Pagination Controls */}
        {responseData && (
          <div className='flex justify-between items-center mt-6 px-6'>
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
              Page {query.data?.data.count === 0 ? 0 : currentPage} of{' '}
              {Math.ceil(responseData.count / PAGE_SIZE)}
            </p>
            <Button
              onClick={handleNextPage}
              onMouseEnter={() => {
                if (responseData.next) {
                  prefetchQuery();
                }
              }}
              disabled={!responseData.next}
              className={`h-10 px-4 text-sm font-medium font-dm-sans ${
                !responseData.next
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
              }`}>
              Next <NextChevronRightIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  function getTitleColor(title: string) {
    switch (title.toLowerCase()) {
      case 'sent':
        return 'text-[#259C80]';
      case 'claimed':
        return 'text-[#13ACF3]';
      case 'redeemed':
        return 'text-[#4E00AD]';
      case 'pending':
        return 'text-[#E5A300]';
      case 'declined':
        return 'text-[#F97878]';
      default:
        return 'text-[#000000]';
    }
  }
  return (
    <div className='border max-h-fit my-auto md:py-5 md:pl-[46px] cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out md:pr-[66px] py-4 px-10 rounded-[10px] flex gap-3 items-center'>
      {icon}
      <div className=''>
        <h3 className='md:text-2xl text-xl font-semibold text-[#0E0E2C]'>
          {value || '--'}
        </h3>
        <p
          className={`text-sm font-dm-sans font-medium ${getTitleColor(
            title
          )}`}>
          {title}
        </p>
      </div>
    </div>
  );
}

export default CashierPage;
