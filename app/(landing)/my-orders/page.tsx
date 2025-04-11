'use client';
import SearchInput from '@/components/custom/search-input';
import ConvertCardIcon from '@/components/icon/convert-card-icon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function MyOrderPage() {
  const router = useRouter();

  return (
    <div className='container mx-auto p-4 mt-2 md:mt-8'>
      <div className='lg:flex justify-between items-center'>
        <h1 className='md:text-2xl font-bold text-base font-dm-sans'>
          My Order
        </h1>
        <SearchInput />
      </div>
      <ul className='mt-4 md:mt-6 space-y-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className='flex items-center justify-between  gap-8 pb-6 border-b flex-wrap'>
            <div>
              <div className='flex items-center gap-2 flex-1 md:hidden mb-2'>
                <ConvertCardIcon width={16} height={16} />
                <p className='text-[8px] sm:text-xs text-[#990099] font-semibold'>
                  Buy Again
                </p>
              </div>
              <div className='flex items-center gap-4 font-montserrat'>
                <Image
                  src={'https://placehold.co/160x100.png'}
                  width={160}
                  height={100}
                  className='max-[380px]:w-[100px]'
                  alt=''
                />
                <p className='md:text-sm text-[10px] font-medium'>
                  Zara gift card
                </p>
              </div>
            </div>
            <div className='md:flex gap-[110px]'>
              <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
                <div className='md:flex-none flex-1 text-end'>
                  <p className='font-dm-sans text-xs md:text-sm font-medium'>
                    GFT - XYZ123456
                  </p>
                  <p className='text-xs md:text-base font-bold mt-5 md:mt-8'>
                    ₦30000
                  </p>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='flex items-center gap-2'>
                  <ConvertCardIcon />
                  <p className='text-base text-[#990099] font-semibold'>
                    Buy Again
                  </p>
                </div>
                <Button
                  onClick={() => {
                    router.push('/order-details');
                  }}
                  className='mt-4 h-[63px] text-base font-semibold min-w-[200px]'>
                  View order
                </Button>
              </div>
            </div>
            <Button
              onClick={() => {
                router.push('/order-details');
              }}
              className='md:hidden h-10 text-xs font-semibold max-w-[130px] flex-1 ml-auto'>
              View order
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrderPage;
