/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GiftCardDetailsTable from '@/components/custom/gift-card-details';
import { useGetSingleCardAssigendQuery } from '@/services/queries/brand.queries';
import { formatCustomDate } from '@/utils/dateFormat';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SenderPageSkeleton from '../../@sender/[id]/loader';

function Page() {
  const cardId = usePathname()?.split('/')[2];

  const { query } = useGetSingleCardAssigendQuery(cardId ?? '');

  if (query.isPending) {
    return <SenderPageSkeleton />;
  }

  if (query.isError) {
    return (
      <div className='w-full mt-8 h-full flex items-ceter justify-center font-dm-sans'>
        <p>No Gift card was found</p>
      </div>
    );
  }

  if (query.data)
    return (
      <div className='container mx-auto px-4 py-6 md:py-11'>
        {/* <TransactionStepper data={query.data as any} activeStep={2} /> */}
        <div className='rounded-[20px] md:border md:mt-[60px] mt-5'>
          <div className='md:p-10 p-3 md:rounded-[20px] md:flex gap-[60px] font-dm-sans items-center space-y-4 md:space-y-0'>
            <Image
              src={query.data.brand_image!}
              width={500}
              className='w-full h-full aspect-[1.7] lg:max-w-[500px] max-h-[200px] md:max-h-[300px] object-center'
              height={300}
              alt=''
            />
            <div>
              <h1 className='md:text-[36px] text-xl font-semibold text-[#990099] font-montserrat'>
                N{query.data?.amount}
              </h1>
              <p className='md:mt-4 mt-3 mb-2 md:mb-3 font-bold md:text-2xl text-base font-montserrat'>
                {query.data?.brand_name}
              </p>
              <p className='lg:leading-[40px] md:leading-[20px] leading-[18px] lg:text-xl md:text-sm text-xs max-w-[585px]'>
                Looking for the perfect gift? Whether it’s fashion, electronics,
                home essentials, beauty products, or more, you’ll find it all
                with our exclusive gift cards! Looking for the perfect gift?
                Whether it’s fashion
              </p>
            </div>
          </div>

          <div className='max-w-[800px] rounded-lg mb-2 md:mb-6 md:py-6 px-7 p-4 bg-[#F6F3FB] mx-2 md:mx-auto'>
            <h2 className='text-[#4A014A] font-montserrat font-semibold mb-2 md:mb-3'>
              Message
            </h2>
            <p className='italic font-dm-sans md:text-xl text-base'>
              Today is all about celebrating you! I hope your day is filled with
              love, laughter, and unforgettable moments. You deserve all the
              happiness in the world, and I’m so grateful to have you in my
              life. May this year bring you new adventures, exciting
              opportunities, and endless joy.
            </p>
          </div>

          <div className='md:pt-10 pt-[30px] md:border-t'>
            <h1 className='font-semibold text-base px-6 font-montserrat md:px-12 mb-3 md:mb-8'>
              Gift Card Details
            </h1>
            <div className='lg:flex lg:gap-12'>
              <GiftCardDetailsTable
                data={{
                  'Gift Card Code': query.data?.card_number,
                  'Date created': formatCustomDate(query.data.sent_date),
                  'Gift Card Value': `₦${query.data?.amount}`,
                  'Gift Card Balance': `₦${query.data?.balance}`,
                  'Brand Name': query.data?.brand_name ?? '',
                  'Sent Date': query.data?.sent_date ?? '',
                  Status: 'Sent',
                }}
              />
              <GiftCardDetailsTable
                data={{
                  'Sender name': query.data?.sender_name ?? '',
                  'Sender Email': query.data?.sender_email ?? '',
                  'Receiver Name': query.data?.receiver_name ?? '',
                  'Receiver Email': query.data?.receiver_email ?? '',
                  'Receiver Phone Number':
                    query.data?.receiver_phone_number ?? '',
                  'Date Issued': formatCustomDate(
                    query.data?.date_issued ?? ''
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <h5 className='md:text-2xl text-xl font-semibold'>
            Redeemable Branches
          </h5>
          <div className='grid md:grid-cols-2'>
            {query.data?.redeemable_branches?.map(
              (branch: any, index: number) => (
                <div
                  key={index}
                  className='md:p-6 p-4 border border-[#E5E5E5] rounded-lg mb-4 md:mb-0'>
                  <h6 className='font-semibold text-base mb-2'>
                    {branch.name}
                  </h6>
                  <p className='text-sm text-[#4A014A]'>
                    {branch.address}, {branch.city}, {branch.state}
                  </p>
                </div>
              )
            )}
            {!query.data?.redeemable_branches?.length && (
              <p className='text-sm text-[#4A014A] mt-4 font-medium font-dm-sans'>
                No redeemable branches available.
              </p>
            )}
          </div>
        </div>
        {/* <div className='md:mt-[60px] mt-7 px-4 md:flex items-center justify-between'>
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
        </div> */}

        {/* <TransactionHistoryTable /> */}
      </div>
    );
}

export default Page;
