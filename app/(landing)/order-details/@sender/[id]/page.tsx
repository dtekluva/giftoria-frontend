'use client';
import { TransactionStepper } from '@/components/custom/transaction-stepper';
import { useGetSingleCardSalesQuery } from '@/services/queries/brand.queries';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import SenderPageSkeleton from './loader';

function Page() {
  const router = useRouter();

  const cardId = usePathname()?.split('/')[2];

  const { query } = useGetSingleCardSalesQuery(cardId ?? '');

  if (query.isPending) {
    return <SenderPageSkeleton />;
  }
  return (
    <div className='container mx-auto px-4 py-6 md:py-11'>
      <div className='flex items-center gap-2 mb-4'>
        <ArrowLeft
          className='cursor-pointer'
          onClick={() => {
            router.back();
          }}
        />
        <h1 className='lg:text-2xl md:text-xl text-base font-albert-sans font-medium'>
          {query.data?.brand_name}
        </h1>
      </div>

      <TransactionStepper data={query.data} activeStep={2} />
      <div className='md:mt-[105px] mt-8 md:pb-10 border-b pb-4 border-[#FAFAFA]'>
        <p className='font-albert-sans italic text-[10px] md:text-sm text-end md:text-start'>
          2 year gurantee included
        </p>
      </div>
      <div className='flex items-center justify-between pt-4 md:pt-8 gap-8 flex-wrap'>
        <div>
          <div className='flex items-center gap-4 font-montserrat'>
            <Image
              src={query.data?.brand_image ?? ''}
              width={160}
              height={100}
              className='max-[380px]:w-[100px]'
              alt=''
            />
            <p className='md:text-sm text-[10px] font-medium'>
              {query.data?.brand_name}
            </p>
          </div>
        </div>
        <div className='md:flex gap-[110px]'>
          <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
            <div className='md:flex-none flex-1 text-end'>
              <p className='font-dm-sans text-xs md:text-sm font-medium'>
                GFT - {query.data?.reference}
              </p>
              <p className='text-xs md:text-base font-bold mt-5 md:mt-8'>
                ₦{query.data?.card_amount?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
