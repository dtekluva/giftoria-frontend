import Link from 'next/link';
import LinkedInIcon from '../icon/linkedin-icon';
import SlackIcon from '../icon/slack-icon';
import TwitterIcon from '../icon/twitter-icon';
import YoutubeIcon from '../icon/youtube-icon';
import { Input } from '../ui/input';

const icons = [
  { icon: <TwitterIcon />, href: 'https://twitter.com/giftoria' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/giftoria' },
  { icon: <YoutubeIcon />, href: 'https://youtube.com/@giftoria' },
  { icon: <SlackIcon />, href: '#' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='mt-auto self-end justify-self-stretch w-full'>
      <div className='bg-primary mt-10'>
        <div className='lg:container mx-auto p-[1.8745rem] space-y-[30px] md:space-y-0 lg:flex lg:gap-12'>

          <div className='flex-1'>
            <p className='text-white font-bold text-sm md:text-xl mb-4'>Giftoria</p>
            <div className='flex items-center gap-4 mb-5'>
              {icons.map((item, index) => (
                <Link key={index} href={item.href} target='_blank' rel='noopener noreferrer' className='text-white hover:opacity-70 transition-opacity'>
                  {item.icon}
                </Link>
              ))}
            </div>
            <p className='text-white font-bold text-sm md:text-base'>CONTACT US</p>
            <ul className='mt-2 space-y-1 text-white/60 text-sm font-dm-sans'>
              <li>
                <a href='mailto:support@giftoria.cc' className='hover:text-white transition-colors'>
                  support@giftoria.cc
                </a>
              </li>
            </ul>
          </div>

          <div className='flex-1'>
            <p className='text-base font-medium text-white lg:text-xl mb-4'>PRODUCTS</p>
            <ul className='space-y-2 text-white/60 font-dm-sans text-sm'>
              <li><Link href='/gift-card' className='hover:text-white transition-colors'>Shop Gift Cards</Link></li>
              <li><Link href='/card-balance' className='hover:text-white transition-colors'>Check Card Balance</Link></li>
              <li><Link href='/auth/admin/sign-up' className='hover:text-white transition-colors'>Become a Merchant</Link></li>
            </ul>
          </div>

          <div className='flex-1'>
            <p className='text-base font-medium text-white lg:text-xl mb-4'>LEGAL</p>
            <ul className='space-y-2 text-white/60 font-dm-sans text-sm'>
              <li><Link href='/privacy-policy' className='hover:text-white transition-colors'>Privacy Policy</Link></li>
              <li><Link href='/terms-of-service' className='hover:text-white transition-colors'>Terms of Service</Link></li>
              <li><Link href='/refund-policy' className='hover:text-white transition-colors'>Refund Policy</Link></li>
            </ul>
          </div>

          <div className='flex-1'>
            <p className='text-base font-medium text-white lg:text-xl mb-4'>Newsletter</p>
            <p className='text-white/60 text-sm mb-3 font-dm-sans'>Stay updated with new brands and offers.</p>
            <div className='flex flex-row rounded-[10px] overflow-hidden'>
              <div className='flex-1'>
                <Input
                  placeholder='Your email address'
                  className='text-[#9C9C9C] bg-[#0000004D] border-0 rounded-none flex-1 max-h-[63px] md:min-w-[200px]'
                />
              </div>
              <button className='min-h-full px-5 bg-[#1F011F] text-xs md:text-base text-white font-medium hover:bg-[#2d0030] transition-colors'>
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className='border-t border-white/10 py-4 px-[1.8745rem]'>
          <p className='text-white/40 text-xs text-center font-dm-sans'>
            © {currentYear} Giftoria. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
