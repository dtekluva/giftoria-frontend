import LogoIcon from '@/components/icon/logo';
import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='md:py-7 md:px-10 px-5 py-5 bg-primary'>
        <LogoIcon />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
