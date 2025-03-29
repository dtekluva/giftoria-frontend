import React from 'react';
import LogoIcon from '../icon/logo';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';

function NavBar() {
  return (
    <div className='px-[30px] py-6 md:px-[50px] flex flex-row items-center justify-between absolute w-full z-50'>
      <LogoIcon width={80} height={30} />
      <div className='flex items-center md:gap-[111px]'>
        <ul className='text-sm flex items-center gap-3 md:gap-6 text-white font-medium'>
          <li>Gift Cards</li>
          <li>Card Balance</li>
        </ul>
        <div className='hidden md:flex items-stretch bg-white rounded-[30px] overflow-hidden'>
          <Input
            className='max-h-11 border-none w-full focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
            placeholder='Search gift card.....'
          />
          <div className='bg-[#990099] rounded-[30px] py-[10px] px-[17px]'>
            <SearchIcon className='text-white' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
