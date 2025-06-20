'use client';

import GiftCardDetailsTable from '@/components/custom/gift-card-details';
import SendIcon from '@/components/icon/send-icon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCardBalanceMutation } from '@/services/mutations/brand.mutation';
import { useRedeemCardQuery } from '@/services/queries/brand.queries';
import { formatCustomDate } from '@/utils/dateFormat';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const { form, onSubmit, isLoading } = useCardBalanceMutation();

  const cardId = usePathname()?.split('/').pop();
  const [cardNumber, setCardNumber] = useState(cardId ?? '');

  const { query } = useRedeemCardQuery(cardNumber);

  const handleCardSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The query will automatically run when cardNumber changes
  };

  return (
    <div className=' md:px-14 px-4 py-3 md:py-7'>
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

      {/* Card Balance Form */}
      <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4'>
        <h1 className='font-semibold text-base font-montserrat mb-3 md:mb-8'>
          Redeem Gift
        </h1>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col'>
              <div className='md:flex space-y-4 md:space-y-0 gap-4 font-dm-sans'>
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-base font-semibold text-gray-700'>
                        Amount
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
              </div>
              <Button
                type='submit'
                className='w-full md:h-[70px] self-center max-w-[540px] mx-auto md:mt-10 mt-5 h-[50px] font-semibold text-base'
                disabled={isLoading}>
                {isLoading ? 'Redeeming...' : 'Redeem Card'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Page;
