import NavBar from '@/components/custom/navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className='relative'>
        <Image
          src={'/assets/hero-desktop-bg.png'}
          alt=''
          width={1440}
          className='hidden md:block w-full'
          height={680}
        />
        <Image
          src={'/assets/hero-mobile-bg.png'}
          alt=''
          width={390}
          className='md:hidden object-contain w-full'
          height={680}
        />
        <div className='bg-[#160032]/70 absolute inset-0' />
      </div>
    </div>
  );
}
