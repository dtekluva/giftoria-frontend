import React from 'react';

function AuthCard({
  children,
  title,
  showPadding = true,
}: {
  children: React.ReactNode;
  title: string;
  showPadding?: boolean;
}) {
  return (
    <div className={'max-w-[630px] mx-auto '}>
      <h1 className='md:text-[40px] text-xl font-semibold text-center'>
        {title}
      </h1>
      <div
        className={`flex flex-col gap-4 md:gap-6 mt-5 bg-white ${
          showPadding ? 'md:py-[60px] py-8' : ''
        }  md:px-10 px-5`}>
        {children}
      </div>
    </div>
  );
}

export default AuthCard;
