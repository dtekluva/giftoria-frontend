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
    href: '#',
  },
  {
    icon: <BillIcon />,
    label: 'Branch',
    href: '#',
  },
  {
    icon: <BillIcon />,
    label: 'Company Details',
    href: '#',
  },
  {
    icon: <TransactionMinusIcon />,
    label: 'Request Fund',
    href: '#',
  },
  {
    icon: <LoginIcon />,
    label: 'Sign Out',
    href: '#',
  },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className='md:px-10 md:pt-9 md:pb-6 px-5 pt-6 pb-4'>
          <LogoIcon />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {/* <SidebarMenuItem></SidebarMenuItem> */}
            {links.map((item, index) => {
              return (
                <SidebarMenuItem
                  key={index}
                  data-active={index === 3 ? 'true' : 'false'}
                  className={`py-1 border-t border-[#D9D9D9] data-[active=true]:border-[#FF0066] peer/${
                    index + 1
                  }`}>
                  <SidebarMenuButton isActive={index === 3} asChild>
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

      <SidebarTrigger className='md:hidden' />
      <div>{children}</div>
    </SidebarProvider>
  );
}

export default AdminLayout;
