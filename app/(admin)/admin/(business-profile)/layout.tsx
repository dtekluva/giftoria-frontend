import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function BusinessProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container mx-auto'>
      <div className='mt-7'>
        <Tabs defaultValue='account' className='px-7'>
          <TabsList>
            <TabsTrigger value='account'>Account</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            Make changes to your account here.
          </TabsContent>
          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>
      </div>
      {children}
    </div>
  );
}

export default BusinessProfileLayout;
