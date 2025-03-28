import LogoIcon from '@/components/icon/logo';
import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='md:py-7 md:px-10 px-5 py-5 bg-primary'>
        <LogoIcon />
      </div>
      <div className='bg-[#F6F3FB] flex flex-1 pt-20 md:pt-[60px] justify-center md:py-[60px] md:px-[60px] py-5 px-5'>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
