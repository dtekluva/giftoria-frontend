'use client';

import GiftCardDetailsTable from '@/components/custom/gift-card-details';
import Table from '@/components/custom/table';
import SendIcon from '@/components/icon/send-icon';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { useCardBalanceMutation } from '@/services/mutations/brand.mutation';
import { useGetCardBalanceQuery } from '@/services/queries/brand.queries';
import { formatCustomDate } from '@/utils/dateFormat';
import { useState, useEffect } from 'react';

// const giftCardDetails = {
//   'Gift Card Code': 'GFT - XYZ123456',
//   'Date Created': '2/10/2023 - 4:30PM',
//   'Gift Card Value': '₦60,000',
//   'Remaining Value': '₦60,000',
//   'Expiry Date': '2/10/2025 - 4:30PM',
//   Status: 'Active',
// };
// const userProfile = {
//   'Sender name': 'John Doe',
//   'Sender email': 'john.doe@example.com',
//   'Receiver phone number': '+1 (555) 123-4567',
//   'Receiver email:': 'New York',
//   'Receiver name': 'Jane Smith',
//   'Date issued': '2022-08-15',
// };

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

function Page() {
  // const { form, onSubmit, isLoading } = useCardBalanceMutation();
  const [cardNumber, setCardNumber] = useState('');
  const [debouncedCardNumber, setDebouncedCardNumber] = useState('');
  const { query } = useGetCardBalanceQuery(debouncedCardNumber);

  const formatTableData = () => {
    return (
      query?.data?.card_transactions?.map((item) => ({
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
      })) ?? []
    );
  };

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCardNumber(cardNumber);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [cardNumber]);

  const handleCardSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The query will automatically run when debouncedCardNumber changes
  };

  return (
    <div className='mx-auto lg:container md:px-14 px-4 py-3 md:py-7'>
      <div className='px-4 pt-6'>
        <h2 className='text-base md:hidden font-semibold'>Gift Card Orders</h2>
        <div className='flex items-center border py-1 px-1 rounded-[8px] md:mt-0 mt-6 max-w-[400px] mx-auto pr-6'>
          <Input
            type='text'
            className='border-none flex-1 md:h-[50px] font-nunito'
            placeholder='Enter gift card unique code'
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <SendIcon onClick={handleCardSearch} />
        </div>
      </div>

      {query.isLoading && (
        <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4 animate-pulse'>
          <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='lg:flex lg:gap-12'>
            <div className='space-y-3 flex-1'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              <div className='h-4 bg-gray-200 rounded w-4/6'></div>
            </div>
            <div className='space-y-3 flex-1'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              <div className='h-4 bg-gray-200 rounded w-4/6'></div>
            </div>
          </div>
        </div>
      )}

      {query.data && (
        <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4'>
          <h1 className='font-semibold text-base font-montserrat md:px-6 mb-3 md:mb-8'>
            Gift Card Details
          </h1>
          <div className='lg:flex lg:gap-12'>
            <GiftCardDetailsTable
              data={{
                'Gift Card Code': query.data.card_number,
                'Date created': formatCustomDate(query.data?.sent_date) ?? '',
                'Gift Card Value': `₦${query.data.amount}`,
                'Remaining Value': `₦${query.data.balance}`,
                'Brand Name': query.data.brand_name,
                'Expiry Date': query.data?.expiry_date ?? '',
                Status: 'Sent',
              }}
            />
            <GiftCardDetailsTable
              data={{
                'Sender name': query.data.sender_name,
                'Sender Email': query.data.sender_email ?? '',
                'Receiver Name': query.data.receiver_name,
                'Receiver Email': query.data?.receiver_email ?? '',
                'Receiver Phone Number':
                  query.data?.receiver_phone_number ?? '',
                'Date Issued': formatCustomDate(query.data.date_issued) ?? '',
              }}
            />
          </div>
        </div>
      )}

      {query.isError && (
        <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4 p-4 bg-red-50 text-red-600 rounded-md'>
          {query.error?.message || 'Failed to fetch card details'}
        </div>
      )}

      <Table
        headers={tableHeaders}
        data={formatTableData()}
        emptyStateMessage='No card transaction'
      />

      {/* Card Balance Form */}
      {/* <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4'>
        <h1 className='font-semibold text-base font-montserrat mb-3 md:mb-8'>
          Redeem Gift
        </h1>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='md:flex space-y-4 md:space-y-0 gap-4'>
                <FormField
                  control={form.control}
                  name='card_value'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-base font-semibold text-gray-700'>
                        Card Value
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter card value'
                          className='md:h-12'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='shopping_value'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-base font-semibold text-gray-700'>
                        Shopping Value
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter shopping value'
                          className='md:h-12'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='card_balance'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-base font-semibold text-gray-700'>
                        Card Balance
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter card balance'
                          className='md:h-12'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type='submit'
                className='w-full md:h-[70px] max-w-[540px] mx-auto md:mt-10 mt-5 h-[50px] font-semibold text-base'
                disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Balance'}
              </Button>
            </form>
          </Form>
        </div>
      </div> */}
    </div>
  );
}

export default Page;
