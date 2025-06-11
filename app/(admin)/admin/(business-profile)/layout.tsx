'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

function BusinessProfileLayout({ children }: { children: React.ReactNode }) {
  const linksHeader = [
    {
      name: 'Company Details',
      href: '/admin/company-details',
    },
    {
      name: 'Branch',
      href: '/admin/branch',
    },
    {
      name: 'Manage Gift Card',
      href: '/admin/manage-gift-card',
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className='mt-7 w-full'>
        <Tabs defaultValue='details' className='md:px-7 w-full border-b-2'>
          <TabsList className='w-full overflow-x-auto flex-nowrap md:max-w-[600px] md:gap-18 gap-8 scrollbar-hide'>
            {linksHeader.map((link) => (
              <TabsTrigger
                key={link.name}
                onClick={() => {
                  router.push(link.href);
                }}
                data-state={link.href === pathname ? 'active' : 'inactive'}
                className='whitespace-nowrap md:pb-4'
                value={link.name.toLowerCase().replace(/\s+/g, '')}>
                {link.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
}

export default BusinessProfileLayout;
