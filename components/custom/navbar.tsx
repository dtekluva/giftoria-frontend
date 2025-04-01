import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import LogoIcon from '../icon/logo';
import MobileLogoIcon from '../icon/mobile-logo';
import ShoppingCartIcon from '../icon/shopping-cart-icon';
import UserIcon from '../icon/user-icon';
import { Input } from '../ui/input';

function NavBar() {
  return (
    <div className='px-[30px] py-6 lg:px-[50px] gap-8  flex flex-row items-center lg:justify-between absolute w-full z-50'>
      <LogoIcon width={80} height={30} className='hidden lg:block' />
      <MobileLogoIcon className='block lg:hidden' />
      <div className='flex items-center lg:justify-end flex-1 lg:flex-none justify-between'>
        <ul className='text-xs lg:text-sm flex items-center gap-3 lg:gap-6 self-center max-w-fit mx-auto text-white font-medium'>
          <li>Gift Cards</li>
          <li>Card Balance</li>
        </ul>
        <div className='hidden lg:flex flex-1 grow items-stretch bg-white rounded-[30px] overflow-hidden lg:ml-[111px] min-w-[278px]'>
          <Input
            className='max-h-11 border-none w-full focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
            placeholder='Search gift card.....'
          />
          <div className='bg-[#990099] rounded-[30px] py-[10px] px-[17px] ml-auto'>
            <SearchIcon className='text-white' />
          </div>
        </div>
        <div className='flex flex-row gap-3 lg:gap-8 ml-7'>
          <div className='flex flex-row gap-3 items-end'>
            <Link
              className='text-white text-sm font-semibold hidden lg:block'
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
