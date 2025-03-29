import React from 'react';

function AuthCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='max-w-[630px] mx-auto max-h-[820px] overflow-y-auto'>
      <h1 className='md:text-[40px] text-xl font-semibold text-center'>
        {title}
      </h1>
      <div className='flex flex-col gap-4 md:gap-6 mt-5 bg-white md:py-[60px] md:px-10 py-8 px-5'>
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
