import * as React from 'react';
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={28} height={28} viewBox='0 0 28 28' fill='none' {...props}>
    <path
      d='M14.0001 13.9997C17.2217 13.9997 19.8334 11.388 19.8334 8.16634C19.8334 4.94468 17.2217 2.33301 14.0001 2.33301C10.7784 2.33301 8.16675 4.94468 8.16675 8.16634C8.16675 11.388 10.7784 13.9997 14.0001 13.9997Z'
      stroke='white'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M24.0216 25.6667C24.0216 21.1517 19.5299 17.5 13.9999 17.5C8.46993 17.5 3.97827 21.1517 3.97827 25.6667'
      stroke='white'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default UserIcon;
