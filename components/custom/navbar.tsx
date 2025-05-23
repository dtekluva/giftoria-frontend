'use client';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoIcon from '../icon/logo';
import MobileLogoIcon from '../icon/mobile-logo';
import ShoppingCartIcon from '../icon/shopping-cart-icon';
import { Input } from '../ui/input';
import { AccountDropdown } from './account-dropdown';
import { getCookie } from 'cookies-next/client';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const access_token = getCookie('access_token');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-[99999] transition-colors duration-300 ${
        isScrolled ? 'bg-primary shadow-md' : ''
      } ${
        pathname != '/'
          ? `bg-primary relative shadow-md ${isScrolled ? 'relative' : ''}`
          : ''
      }`}>
      <div className='px-[30px] py-6 lg:px-[50px] flex flex-row items-center lg:justify-between container mx-auto'>
        <Link className='cursor-pointer' href={'/'}>
          <LogoIcon width={80} height={30} className='hidden lg:block' />
          <MobileLogoIcon className='block lg:hidden' />
        </Link>
        <div className='flex items-center lg:justify-end flex-1 lg:flex-none justify-between'>
          <ul className='text-xs lg:text-sm flex items-center gap-3 lg:gap-6 self-center max-w-fit mx-auto text-white font-medium'>
            <li>
              <Link href={'/gift-card'}>Gift Cards</Link>
            </li>
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
              {!access_token && (
                <Link
                  className='text-white text-sm font-semibold hidden lg:block'
                  href={'/auth/sign-up'}>
                  Sign up
                </Link>
              )}
              <AccountDropdown />
            </div>
            <ShoppingCartIcon
              className='cursor-pointer'
              onClick={() => {
                router.push('/order-summary');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
