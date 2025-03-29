import SearchIcon from '@/components/icon/search-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className='relative md:bg-[url(/assets/hero-desktop-bg.png)] bg-[url(/assets/hero-mobile-bg.png)] bg-cover bg-no-repeat bg-center'>
        <div className='bg-[#160032]/70 flex flex-col pt-20 md:pt-32 px-4 md:px-10 md:pb-[164px] pb-20'>
          <div className='md:hidden flex relative bg-white z-50 rounded-full max-w-[80%] mx-auto overflow-hidden'>
            <Input
              className='h-11 border-none w-full focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 flex-1'
              placeholder='Search gift card.....'
            />
            <div className='bg-[#990099] rounded-full py-2.5 px-4 ml-auto'>
              <SearchIcon className='text-white' />
            </div>
          </div>
          <h1 className='mt-12 md:mt-14 text-white text-center text-2xl md:text-6xl font-semibold'>
            Gifting done with style
          </h1>
          <p className='mt-2 md:mt-8 text-white text-center text-xs md:text-2xl leading-5 md:leading-10 font-semibold'>
            Give a gift that let them pick what they truly love.
            <br />
            Simple, Flexible, and always the perfect choice
          </p>
          <Button className='w-full mt-8 md:mt-14 max-w-36 md:max-w-2xl mx-auto h-10 md:h-[4.375rem] text-sm md:text-xl font-semibold rounded-full'>
            Send a gift
          </Button>
        </div>
      </div>
      <div>
        <h2 className='px-4 md:px-[60px] mt-6 md:mt-[60px] text-center text-base md:text-[40px] font-semibold'>
          Explore our collections of Gift cards
        </h2>
        <div className='grid md:mt-10 mt-3 gap-5 md:grid-cols-4 md:px-[50px] container mx-auto max-w-fit px-5'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='py-5 px-5 items-center justify-center w-[320px] h-[245px] bg-[#fff] rounded-[30px] border-[0.3px] border-[#D9D9D9] '>
              <Image
                className='mt-7'
                src={'https://placehold.co/280x140.png'}
                width={280}
                height={140}
                alt=''
              />
              <p className='text-black text-2xl text-left'>Zara gift card</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
