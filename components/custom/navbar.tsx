import React from 'react';
import LogoIcon from '../icon/logo';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Link from 'next/link';
import UserIcon from '../icon/user-icon';
import ShoppingCartIcon from '../icon/shopping-cart-icon';
import MobileLogoIcon from '../icon/mobile-logo';

function NavBar() {
  return (
    <div className='px-[30px] py-6 md:px-[50px] gap-8  flex flex-row items-center md:justify-between absolute w-full z-50'>
      <LogoIcon width={80} height={30} className='hidden md:block' />
      <MobileLogoIcon className='block md:hidden' />
      <div className='flex items-center md:justify-end flex-1 md:flex-none justify-between'>
        <ul className='text-xs md:text-sm flex items-center gap-3 md:gap-6 self-center max-w-fit mx-auto text-white font-medium'>
          <li>Gift Cards</li>
          <li>Card Balance</li>
        </ul>
        <div className='hidden md:flex flex-1 grow items-stretch bg-white rounded-[30px] overflow-hidden md:ml-[111px] min-w-[278px]'>
          <Input
            className='max-h-11 border-none w-full focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
            placeholder='Search gift card.....'
          />
          <div className='bg-[#990099] rounded-[30px] py-[10px] px-[17px] ml-auto'>
            <SearchIcon className='text-white' />
          </div>
        </div>
        <div className='flex flex-row gap-3 md:gap-8 ml-7'>
          <div className='flex flex-row gap-3 items-end'>
            <Link
              className='text-white text-sm font-semibold hidden md:block'
              href={'/auth/sign-up'}>
              Sign up
            </Link>
            <UserIcon />
          </div>
          <ShoppingCartIcon />
          {/* <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
