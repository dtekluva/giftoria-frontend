import Footer from '@/components/custom/footer';
import NavBar from '@/components/custom/navbar';
import React from 'react';

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar />

      <div className='mt-20'>{children}</div>
      <Footer />
    </div>
  );
}

export default LandingLayout;
