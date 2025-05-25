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
import React from 'react';

const giftCardDetails = {
  'Gift Card Code': 'GFT - XYZ123456',
  'Date Created': '2/10/2023 - 4:30PM',
  'Gift Card Value': '₦60,000',
  'Remaining Value': '₦60,000',
  'Expiry Date': '2/10/2025 - 4:30PM',
  Status: 'Active',
};
const userProfile = {
  'Sender name': 'John Doe',
  'Sender email': 'john.doe@example.com',
  'Receiver phone number': '+1 (555) 123-4567',
  'Receiver email:': 'New York',
  'Receiver name': 'Jane Smith',
  'Date issued': '2022-08-15',
};

function Page() {
  const { form, onSubmit, isLoading } = useCardBalanceMutation();

  return (
    <div className='mx-auto lg:container md:px-14 px-4 py-3 md:py-7'>
      <div className='px-4 pt-6'>
        <h2 className='text-base md:hidden font-semibold'>Gift Card Orders</h2>
        <div className='flex items-center border py-1 px-1 rounded-[8px] md:mt-0 mt-6 max-w-[400px] mx-auto pr-6'>
          <Input
            type='text'
            className='border-none flex-1 md:h-[50px] font-nunito'
            placeholder='Enter gift card unique code'
          />
          <SendIcon />
        </div>
      </div>
      <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4'>
        <h1 className='font-semibold text-base font-montserrat md:px-12 mb-3 md:mb-8'>
          Gift Card Details
        </h1>
        <div className='lg:flex lg:gap-12'>
          <GiftCardDetailsTable data={giftCardDetails} />
          <GiftCardDetailsTable data={userProfile} />
        </div>
      </div>

      {/* Card Balance Form */}
      <div className='md:pt-10 pt-[30px] md:border-t md:mt-6 mt-4'>
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
      </div>
    </div>
  );
}

export default Page;
