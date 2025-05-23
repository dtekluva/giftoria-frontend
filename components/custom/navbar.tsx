'use client';
import { ICard } from '@/libs/types/brand.types';
import { useSearchAllBrands } from '@/services/queries/brand.queries';
import { getCookie } from 'cookies-next/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoIcon from '../icon/logo';
import MobileLogoIcon from '../icon/mobile-logo';
import ShoppingCartIcon from '../icon/shopping-cart-icon';
import { Input } from '../ui/input';
import { AccountDropdown } from './account-dropdown';

function NavBar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const access_token = getCookie('access_token');

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    pathname === '/' ? ['transparent', '#4a014a'] : ['#4a014a', '#4a014a'] // Always primary color for non-landing pages
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    pathname === '/'
      ? ['none', '0 4px 6px -1px rgb(0 0 0 / 0.1)']
      : ['0 4px 6px -1px rgb(0 0 0 / 0.1)', '0 4px 6px -1px rgb(0 0 0 / 0.1)'] // Always shadow for non-landing pages
  );

  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { query } = useSearchAllBrands({ search });
  const suggestions = query.data?.results || [];

  return (
    <motion.div
      style={{
        backgroundColor,
        boxShadow,
      }}
      className={`fixed top-0 w-full z-[99999] ${
        pathname != '/' ? `bg-primary shadow-md` : ''
      } `}>
      <div className='px-[30px] relative py-6 lg:px-[50px] flex flex-row items-center lg:justify-between container mx-auto'>
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
          <div className='hidden relative lg:flex flex-1 grow items-stretch bg-white rounded-[30px] overflow-hidden lg:ml-[111px] min-w-[278px]'>
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(
                    `/gift-card?search=${encodeURIComponent(search)}`
                  );
                  setShowSuggestions(false);
                }
              }}
              className='max-h-11 border-none w-full focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
              placeholder='Search gift card.....'
            />

            <div className='bg-[#990099] rounded-[30px] py-[10px] px-[17px] ml-auto'>
              <SearchIcon className='text-white' />
            </div>
          </div>

          {showSuggestions && search && suggestions.length > 0 && (
            <div className='absolute z-[9999999] top-20  right-40 md:min-w-[300px] mt-1  bg-white border rounded shadow-lg max-h-60 overflow-y-auto'>
              {suggestions.map((brand: ICard) => (
                <div
                  key={brand.id}
                  className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center border-b last:border-b-0'
                  onMouseDown={() => {
                    router.push(`/gift-card/${brand.id}`);
                    setShowSuggestions(false);
                    setSearch(brand.brand_name);
                  }}>
                  {brand.image && (
                    <Image
                      src={brand.image}
                      width={40}
                      height={40}
                      alt={brand.brand_name}
                      className='w-10 h-10 mr-2 rounded'
                    />
                  )}
                  <div>
                    <div className='font-semibold'>{brand.brand_name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showSuggestions && search && suggestions.length === 0 && (
            <div className='absolute z-[9999999] top-20 right-40 md:min-w-[300px] mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto flex items-center justify-center py-4'>
              <span className='text-gray-500 text-sm'>
                No gift cards found for &quot;{search}&quot;
              </span>
            </div>
          )}
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
    </motion.div>
  );
}

export default NavBar;
