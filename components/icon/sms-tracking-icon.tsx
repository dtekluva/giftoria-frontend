import * as React from 'react';

const SMSTrackingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='40'
    height='40'
    {...props}
    fill='none'
    viewBox='0 0 40 40'>
    <circle cx='20' cy='20' r='20' fill='#F6F3FB'></circle>
    <path
      stroke='#909'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='1.5'
      d='M10 16.5c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5H15'></path>
    <path
      stroke='#909'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='1.5'
      d='m25 17-3.13 2.5c-1.03.82-2.72.82-3.75 0L15 17M10 24.5h6M10 20.5h3'></path>
  </svg>
);

export default SMSTrackingIcon;
