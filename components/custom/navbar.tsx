import React from 'react';
import LogoIcon from '../icon/logo';

function NavBar() {
  return (
    <div className='px-[30px] py-6 md:px-[50px] flex flex-row items-center justify-between absolute w-full z-50'>
      <LogoIcon width={80} height={30} />
      <div>
        <ul className='text-sm flex items-center gap-3 md:gap-6 text-white font-medium'>
          <li>Gift Cards</li>
          <li>Card Balance</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
