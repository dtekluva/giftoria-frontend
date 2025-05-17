'use client';
import LoginIcon from '@/components/icon/login-icon';
import LogoIcon from '@/components/icon/logo';
import MoneyIcon from '@/components/icon/money-icon';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ApiUserInfoResponse } from '@/libs/types/auth.types';
import { user_keys } from '@/services/queries/user.queries';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { deleteCookie } from 'cookies-next/client';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react';

const links = [
  {
    icon: <UserIcon height={20} width={20} />,
    label: 'Profile',
    href: '/cashier/profile',
  },
  {
    icon: <MoneyIcon />,
    label: 'Gift Cards',
    href: '/cashier/gift-cards',
    details: 'Gift Card Orders',
  },

  {
    icon: <LoginIcon />,
    label: 'Sign Out',
    href: '#',
    action: () => {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      deleteCookie('password');
    },
  },
];

function CashierLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userData: AxiosResponse<ApiUserInfoResponse> | undefined =
    queryClient.getQueryData(user_keys.userInfo());

  // Helper to detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Function to close sidebar on mobile
  const handleMenuClick = useCallback(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar>
        <SidebarHeader className='md:px-10 md:pt-9 px-5 pt-6 pb-4'>
          <LogoIcon height={40} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {links.map((item, index) => {
              return (
                <SidebarMenuItem
                  key={index}
                  onClick={() => {
                    if (item.action) item.action();
                    handleMenuClick();
                  }}
                  data-active={pathname === item.href}
                  className={`py-1 border-t border-[#D9D9D9] data-[active=true]:border-[#FF0066] peer/${
                    index + 1
                  }`}>
                  <SidebarMenuButton isActive={pathname === item.href} asChild>
                    <Link
                      href={item.href}
                      className='text-white font-dm-sans text-base font-bold rounded-none'>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className='flex flex-col w-full lg:container mx-auto'>
        <div className='bg-primary lg:hidden p-4 w-full'>
          <SidebarTrigger onClick={() => setSidebarOpen(true)} />
        </div>
        <div className='border-b-[2px] border-[#F6F3FB] hidden md:block'>
          <div
            className={`container mt-6 md:mt-[36px] flex items-end pl-7 mb-4`}>
            <h1 className='text-xl font-semibold'>
              {links.find((item) => item.href === pathname)?.details || ''}
            </h1>
            <div className='ml-auto pl-14 flex justify-end pr-10 gap-2 items-center'>
              <Image
                src={'https://placehold.co/40x40.png'}
                width={40}
                height={40}
                alt='Admin Banner'
                className='rounded-full'
              />
              <div>
                <h2 className='font-bold text-sm'>
                  {userData?.data.first_name} {userData?.data.last_name}
                </h2>
                <p className='text-[10px] text-[#818181]'>
                  {userData?.data.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default CashierLayout;
