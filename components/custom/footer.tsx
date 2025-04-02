import React from 'react';
import TwitterIcon from '../icon/twitter-icon';
import LinkedInIcon from '../icon/linkedin-icon';
import YoutubeIcon from '../icon/youtube-icon';
import SlackIcon from '../icon/slack-icon';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const icons = [
  { icon: <TwitterIcon /> },
  { icon: <LinkedInIcon /> },
  { icon: <YoutubeIcon /> },
  { icon: <SlackIcon /> },
];

function Footer() {
  return (
    <div className='bg-primary mt-10'>
      <div className='lg:container mx-auto p-[1.8745rem] space-y-[30px] md:space-y-0 lg:flex'>
        <div>
          <div className='flex items-center gap-4'>
            {icons.map((item, index) => (
              <div key={index} className='text-white'>
                {item.icon}
              </div>
            ))}
          </div>
          <p className='mt-5 text-white font-bold text-sm md:text-2xl'>
            CONTACT US
          </p>
        </div>
        <div className='lg:ml-auto lg:mr-[117px]'>
          <p className='text-base font-medium text-white lg:text-3xl'>
            PRODUCTS
          </p>
          <ul className='mt-4 text-white/60 font-dm-sans'>
            <li>Shop Gift Cards</li>
            <li>Become a Merchant</li>
          </ul>
        </div>
        <div className=''>
          <p className='text-base font-medium text-white lg:text-3xl'>
            Newsletter
          </p>
          <div className='mt-2 md:mt-5 flex flex-row rounded-[10px] overflow-hidden'>
            <div className='flex-1'>
              <Input
                placeholder='Your email address'
                className='text-[#9C9C9C] bg-[#0000004D] border-0 rounded-none flex-1 max-h-[63px] md:min-w-[280px]'
              />
            </div>
            <button className='min-h-full px-5 bg-[#1F011F] text-xs md:text-base text-white font-medium'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
