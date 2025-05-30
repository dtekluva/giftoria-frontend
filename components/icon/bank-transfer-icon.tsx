import * as React from 'react';
const BankTransferIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={60}
    height={60}
    viewBox='0 0 60 60'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <g clipPath='url(#clip0_7120_1570)'>
      <path d='M17.5 25H10V42.5H17.5V25Z' fill='#4A014A' />
      <path d='M33.75 25H26.25V42.5H33.75V25Z' fill='#4A014A' />
      <path d='M55 47.5H5V55H55V47.5Z' fill='#4A014A' />
      <path d='M50 25H42.5V42.5H50V25Z' fill='#4A014A' />
      <path d='M30 2.5L5 15V20H55V15L30 2.5Z' fill='#4A014A' />
    </g>
    <defs>
      <clipPath id='clip0_7120_1570'>
        <rect width={60} height={60} fill='white' />
      </clipPath>
    </defs>
  </svg>
);
export default BankTransferIcon;
