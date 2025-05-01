'use client';
import GiftCardDetailsTable from '@/components/custom/gift-card-details';
import SearchInput from '@/components/custom/search-input';
import TransactionHistoryTable from '@/components/custom/transaction-history-table';
import { TransactionStepper } from '@/components/custom/transaction-stepper';
import ImportIcon from '@/components/icon/import-icon';
import Image from 'next/image';

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
  return (
    <div className='container mx-auto px-4 py-6 md:py-11'>
      <TransactionStepper activeStep={3} />
      <div className='rounded-[20px] md:border md:mt-[60px] mt-5'>
        <div className='md:p-10 p-3 md:rounded-[20px] md:flex gap-[60px] font-dm-sans items-center space-y-4 md:space-y-0'>
          <Image
            src={'https://placehold.co/500x300.png'}
            width={500}
            className='w-full h-full aspect-[1.7] lg:max-w-[500px] max-h-[200px] md:max-h-[300px] object-cover'
            height={300}
            alt=''
          />
          <p className='lg:leading-[40px] md:leading-[20px] leading-[18px] lg:text-xl md:text-sm text-xs max-w-[585px]'>
            Looking for the perfect gift? Whether it’s fashion, electronics,
            home essentials, beauty products, or more, you’ll find it all with
            our exclusive gift cards! Looking for the perfect gift? Whether it’s
            fashion
          </p>
        </div>

        <div className='md:pt-10 pt-[30px] md:border-t'>
          <h1 className='font-semibold text-base px-6 font-montserrat md:px-12 mb-3 md:mb-8'>
            Gift Card Details
          </h1>
          <div className='lg:flex lg:gap-12'>
            <GiftCardDetailsTable data={giftCardDetails} />
            <GiftCardDetailsTable data={userProfile} />
          </div>
        </div>
      </div>
      <div className='md:mt-[60px] mt-7 px-4 md:flex items-center justify-between'>
        <h3 className='font-semibold md:text-xl lg:text-2xl text-base'>
          Shopping History
        </h3>
        <div className='grid grid-cols-[1fr_auto] md:flex gap-3 mt-4 md:mt-0'>
          <SearchInput className='max-w-[100%]' />
          <button className='bg-[#990099] text-sm text-white cursor-pointer md:px-8 md:py-2 flex items-center gap-2 rounded-[8px] p-3'>
            <span className='hidden lg:block'>Download Transactions</span>
            <ImportIcon />
          </button>
        </div>
      </div>

      <TransactionHistoryTable />
    </div>
  );
}

export default Page;
