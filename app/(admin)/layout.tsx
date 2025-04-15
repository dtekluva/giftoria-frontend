'use client';
import BillIcon from '@/components/icon/bill-icon';
import LoginIcon from '@/components/icon/login-icon';
import LogoIcon from '@/components/icon/logo';
import MoneyIcon from '@/components/icon/money-icon';
import TransactionMinusIcon from '@/components/icon/transaction-minus-icon';
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
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  {
    icon: <UserIcon height={20} width={20} />,
    label: 'Profile',
    href: '/admin/profile',
  },
  {
    icon: <MoneyIcon />,
    label: 'Gift Cards',
    href: '/admin/gift-cards',
    details: 'Gift Card Orders',
  },
  {
    icon: <BillIcon />,
    label: 'Branch',
    href: '/admin/branch',
    details: 'Business Profile',
  },
  {
    icon: <BillIcon />,
    label: 'Company Details',
    href: '/admin/company-details',
    details: 'Business Profile',
  },
  {
    icon: <TransactionMinusIcon />,
    label: 'Request Fund',
    href: '/admin/request-funds',
    details: 'Request Funds',
  },
  {
    icon: <LoginIcon />,
    label: 'Sign Out',
    href: '#',
  },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className='md:px-10 md:pt-9 px-5 pt-6 pb-4'>
          <LogoIcon height={40} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {/* <SidebarMenuItem></SidebarMenuItem> */}
            {links.map((item, index) => {
              return (
                <SidebarMenuItem
                  key={index}
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

      <div className='flex flex-col w-full container mx-auto'>
        <div className='bg-primary lg:hidden p-4 w-full'>
          <SidebarTrigger />
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
                <h2 className='font-bold text-sm'>Shopybee</h2>
                <p className='text-[10px] text-[#818181]'>shopybee@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
