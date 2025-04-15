import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

function BusinessProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container mx-auto'>
      <div className='mt-7 w-full'>
        <Tabs defaultValue='details' className='px-7 w-full border-b-2'>
          <TabsList className='w-full md:max-w-[600px]'>
            <TabsTrigger className='md:pb-4' value='details'>
              Company Details
            </TabsTrigger>
            <TabsTrigger className='md:pb-4' value='branch'>
              Branch
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
}

export default BusinessProfileLayout;
