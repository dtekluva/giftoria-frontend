import * as React from 'react';
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={56}
    height={56}
    viewBox='0 0 56 56'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <rect x={4} y={4} width={48} height={48} rx={24} fill='#F6F3FB' />
    <rect
      x={4}
      y={4}
      width={48}
      height={48}
      rx={24}
      stroke='white'
      strokeWidth={8}
    />
  </svg>
);
export default GlobeIcon;
