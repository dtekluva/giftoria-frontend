import * as React from 'react';
const SMSIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <circle cx={20} cy={20} r={20} fill='#F6F3FB' />
    <path
      d='M25 28.3018H15C12 28.3018 10 26.8018 10 23.3018V16.3018C10 12.8018 12 11.3018 15 11.3018H25C28 11.3018 30 12.8018 30 16.3018V23.3018C30 26.8018 28 28.3018 25 28.3018Z'
      stroke='#990099'
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M25 16.8018L21.87 19.3018C20.84 20.1218 19.15 20.1218 18.12 19.3018L15 16.8018'
      stroke='#990099'
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SMSIcon;
