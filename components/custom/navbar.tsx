'use client';
import { Category, ICard } from '@/libs/types/brand.types';
import {
  useGetCategoriesQuery,
  useSearchAllBrands,
} from '@/services/queries/brand.queries';
import { deleteCookie, getCookie } from 'cookies-next/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, SearchIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BillIcon from '../icon/bill-icon';
import LogoIcon from '../icon/logo';
import MoneyIcon from '../icon/money-icon';
import ShoppingCartIcon from '../icon/shopping-cart-icon';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '../ui/drawer';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { AccountDropdown } from './account-dropdown';

function NavBar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const access_token = getCookie('access_token');
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const { query } = useSearchAllBrands({ search });
  const suggestions = query.data?.results || [];

  const { query: categoriesQuery } = useGetCategoriesQuery();
  const categories = categoriesQuery.data?.results || [];
  const isSuccess = categoriesQuery.isSuccess;

  // Function to get cart count
  const getCartCount = () => {
    try {
      const cartData = localStorage.getItem('cards');
      if (cartData) {
        const data = JSON.parse(cartData);
        const items = data.cards || [];
        return items.length;
      }
      return 0;
    } catch (error) {
      console.error('Error getting cart count:', error);
      return 0;
    }
  };

  // Update cart count on mount and when storage changes
  useEffect(() => {
    // Initial count
    setCartItemsCount(getCartCount());

    // Function to handle storage changes
    const handleStorageChange = () => {
      setCartItemsCount(getCartCount());
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);
    // Add a custom event listener for cart deletion
    window.addEventListener('cartDeleted', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
      window.removeEventListener('cartDeleted', handleStorageChange);
    };
  }, []);

  // Add a polling mechanism to check for cart changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCartItemsCount(getCartCount());
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Update scroll state
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 0);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    pathname === '/' ? ['transparent', '#4a014a'] : ['#4a014a', '#4a014a']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    pathname === '/'
      ? ['none', '0 4px 6px -1px rgb(0 0 0 / 0.1)']
      : ['0 4px 6px -1px rgb(0 0 0 / 0.1)', '0 4px 6px -1px rgb(0 0 0 / 0.1)']
  );

  const handleCategoryChange = (value: string) => {
    router.push(
      `/gift-card?${search ? `search=${search}` : ''}&category=${value}`
    );
  };

  const mobileLinks = access_token
    ? [
        {
          label: 'Profile',
          href: '/profile',
          icon: <UserIcon height={20} width={20} />,
        },
        {
          label: 'Gift Cards',
          href: '/gift-card',
          icon: <MoneyIcon />,
        },
        {
          label: 'Card Balance',
          href: '/card-balance',
          icon: <BillIcon />,
        },
        {
          label: 'Orders',
          href: '/orders',
          icon: <BillIcon />,
        },
        {
          label: 'Sign Out',
          href: '#',
          icon: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-log-out'>
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
              <path d='m16 17 5-5-5-5' />
              <path d='M21 12H9' />
            </svg>
          ),
          action: () => {
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            deleteCookie('password');
            router.push('/'); // Redirect to home or login after sign out
          },
        },
      ]
    : [
        {
          label: 'Gift Cards',
          href: '/gift-card',
          icon: <MoneyIcon />,
        },
        {
          label: 'Card Balance',
          href: '/card-balance',
          icon: <BillIcon />,
        },
        {
          label: 'Sign Up',
          href: '/auth/sign-up',
          icon: <UserIcon height={20} width={20} />,
        },
      ];

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
        </Link>
        <Drawer direction='left'>
          <DrawerTrigger className='lg:hidden z-[999999] text-white'>
            <Menu size={24} />
          </DrawerTrigger>
          <DrawerContent className='bg-primary text-white pt-0 z-[9999999999]'>
            <div className='md:px-10 md:pt-9 px-5 pt-6 pb-4 flex items-center justify-between'>
              <Link href={'/'}>
                <LogoIcon height={40} />
              </Link>
              <DrawerClose className='text-white'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-x'>
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              </DrawerClose>
            </div>
            <div className='flex flex-col'>
              {mobileLinks.map((item, index) => (
                <div
                  data-active={pathname !== item.href}
                  className='data-[active=true]:pl-[84px]'
                  key={index}>
                  <div
                    data-active={pathname === item.href}
                    className={`pt-6 py-3 border-b border-[#D9D9D9]  data-[active=true]:pl-[84px] data-[active=true]:border-[#FF0066] peer/${
                      index + 1
                    }`}
                    onClick={() => {
                      if (item.action) item.action();
                    }}>
                    <Link
                      href={item.href}
                      className='text-white font-dm-sans text-base font-bold rounded-none px-5 py-2 flex items-center gap-3'>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>

        <div className='flex items-center lg:justify-end flex-1 lg:flex-none justify-between'>
          <ul className='text-xs lg:text-sm hidden lg:flex items-center gap-3 lg:gap-6 self-center max-w-fit mx-auto text-white font-medium'>
            {!isScrolled && (
              <>
                <li>
                  <Link href={'/gift-card'}>Gift Cards</Link>
                </li>
                <li>
                  <Link href={'/card-balance'}>Card Balance</Link>
                </li>
              </>
            )}
          </ul>
          <div className='flex items-center gap-11 lg:ml-[111px] ml-auto'>
            {isScrolled && isSuccess && (
              <>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className='md:min-w-[275px] md:min-h-11 max-h-11 min-w-[150px] text-black font-dm-sans bg-white rounded-full h-full border-white'>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent className='z-[9999999999] text-black text-base font-dm-sans'>
                    {categories.map((category: Category) => (
                      <SelectItem
                        key={category.id}
                        value={category.category_name}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            <div className='hidden relative lg:flex flex-1 grow items-stretch bg-white rounded-[30px] overflow-hidden min-w-[278px]'>
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
            <div className='relative'>
              <ShoppingCartIcon
                className='cursor-pointer'
                onClick={() => {
                  router.push('/order-summary');
                }}
              />
              {cartItemsCount > 0 && (
                <div
                  className='absolute -top-1 -right-1 bg-[#FF0066] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-50 shadow-md'
                  style={{ transform: 'translate(25%, -25%)' }}>
                  {cartItemsCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NavBar;
