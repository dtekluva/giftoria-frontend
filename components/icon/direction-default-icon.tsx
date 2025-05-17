import * as React from 'react';

const DirectionDefaultIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='40'
    height='40'
    fill='none'
    {...props}
    viewBox='0 0 40 40'>
    <circle cx='20' cy='20' r='20' fill='#F6F3FB'></circle>
    <path
      stroke='#909'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='1.5'
      d='M15 20c-4 0-4 1.79-4 4v1c0 2.76 0 5 5 5h8c4 0 5-2.24 5-5v-1c0-2.21 0-4-4-4-1 0-1.28.21-1.8.6l-1.02 1.08a3 3 0 0 1-4.37 0L16.8 20.6c-.52-.39-.8-.6-1.8-.6M27 20v-6c0-2.21 0-4-4-4h-6c-4 0-4 1.79-4 4v6'></path>
    <path
      stroke='#909'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M18.55 17.23h3.33M17.72 14.23h5'></path>
  </svg>
);

export default DirectionDefaultIcon;
