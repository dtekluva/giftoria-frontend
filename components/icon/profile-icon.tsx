import * as React from 'react';
const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={100}
    height={100}
    viewBox='0 0 100 100'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <circle cx={50} cy={50} r={49.5} fill='white' stroke='#EEEEEE' />
    <path
      d='M49.9993 49.9997C54.6017 49.9997 58.3327 46.2687 58.3327 41.6663C58.3327 37.064 54.6017 33.333 49.9993 33.333C45.397 33.333 41.666 37.064 41.666 41.6663C41.666 46.2687 45.397 49.9997 49.9993 49.9997Z'
      stroke='#9C9C9C'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M64.3169 66.6667C64.3169 60.2167 57.9003 55 50.0003 55C42.1003 55 35.6836 60.2167 35.6836 66.6667'
      stroke='#9C9C9C'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default ProfileIcon;
