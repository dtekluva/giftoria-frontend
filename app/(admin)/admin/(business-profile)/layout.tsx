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
  ];

  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className='mt-7 w-full'>
        <Tabs defaultValue='details' className='px-7 w-full border-b-2'>
          <TabsList className='w-full md:max-w-[600px] md:gap-16'>
            {linksHeader.map((link) => (
              <TabsTrigger
                key={link.name}
                onClick={() => {
                  router.push(link.href);
                }}
                data-state={link.href === pathname ? 'active' : 'inactive'}
                className='md:pb-4'
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
