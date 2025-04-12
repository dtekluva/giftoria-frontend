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
import Link from 'next/link';
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
    href: '/admin/profile',
  },
  {
    icon: <BillIcon />,
    label: 'Profile',
    href: '/admin/profile',
  },
  {
    icon: <TransactionMinusIcon />,
    label: 'Profile',
    href: '/admin/profile',
  },
  {
    icon: <LoginIcon />,
    label: 'Login',
    href: '/admin/profile',
  },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className='md:px-10 md:pt-9 md:pb-6 px-5 pt-6 pb-4 border-b border-[#D9D9D9]'>
          <LogoIcon />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {/* <SidebarMenuItem></SidebarMenuItem> */}
            {links.map((item, index) => {
              return (
                <SidebarMenuItem
                  key={index}
                  className='py-1 border-b border-white'>
                  <SidebarMenuButton asChild>
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

      <SidebarTrigger />
      <div className='container mx-auto px-4 py-6 md:py-11'>{children}</div>
    </SidebarProvider>
  );
}

export default AdminLayout;
