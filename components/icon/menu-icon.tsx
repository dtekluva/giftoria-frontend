import * as React from 'react';
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={4}
    height={20}
    viewBox='0 0 4 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <circle cx={2} cy={2} r={2} fill='#032282' />
    <circle cx={2} cy={10} r={2} fill='#032282' />
    <circle cx={2} cy={18} r={2} fill='#032282' />
  </svg>
);
export default MenuIcon;
