import Link from 'next/link';
import LinkedInIcon from '../icon/linkedin-icon';
import SlackIcon from '../icon/slack-icon';
import TwitterIcon from '../icon/twitter-icon';
import YoutubeIcon from '../icon/youtube-icon';
import { Input } from '../ui/input';

const icons = [
  { icon: <TwitterIcon /> },
  { icon: <LinkedInIcon /> },
  { icon: <YoutubeIcon /> },
  { icon: <SlackIcon /> },
];

function Footer() {
  return (
    <div className='mt-auto self-end justify-self-stretch w-full'>
      <div className='bg-primary mt-10'>
        <div className='lg:container mx-auto p-[1.8745rem] md:pb-[50px] space-y-[30px] md:space-y-0 lg:flex border-b-[0.8px] border-white'>
          <div>
            <div className='flex items-center gap-4'>
              {icons.map((item, index) => (
                <div key={index} className='text-white'>
                  {item.icon}
                </div>
              ))}
            </div>
            <p className='mt-5 text-white font-medium text-sm md:text-2xl'>
              Contact Us
            </p>
          </div>
          <div className='lg:ml-auto lg:mr-[117px]'>
            <p className='text-base font-medium text-white lg:text-3xl'>
              Product
            </p>
            <ul className='mt-4 text-white/60 font-dm-sans'>
              <li>
                {' '}
                <Link href={'/gift-card'}>Shop Gift Cards</Link>
              </li>
              <li>
                {' '}
                <Link href={'/auth/admin/sign-up'}>Become a Merchant</Link>
              </li>
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
        <div className='pt-6 flex flex-col md:flex-row justify-between text-sm md:pt-10 lg:container mx-auto max-md:gap-6 p-[1.8745rem] text-white'>
          <div className='flex-1'>
            <p>Copyright © 2023 Giftoria. All rights reserved</p>
          </div>
          <div className='flex justify-between flex-1'>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
