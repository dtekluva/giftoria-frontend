import FAQ from '@/components/custom/faq';
import CardTickIcon from '@/components/icon/card-tick-icon';
import GlobeIcon from '@/components/icon/global-icon';
import MailIcon from '@/components/icon/mail-icon';
import MoneyRemoveIcon from '@/components/icon/money-remove-icon';
import SearchIcon from '@/components/icon/search-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <section className='relative md:bg-[url(/assets/hero-desktop-bg.png)] bg-[url(/assets/hero-mobile-bg.png)] bg-cover bg-no-repeat bg-center'>
        <div className='bg-[#160032]/70 flex flex-col pt-20 md:pt-32 px-4 md:px-10 md:pb-[10.25rem] pb-20'>
          <div className='md:hidden flex relative bg-white z-50 rounded-full max-w-[80%] mx-auto overflow-hidden'>
            <Input
              className='h-[2.75rem] border-none w-full focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 flex-1'
              placeholder='Search gift card.....'
            />
            <div className='bg-[#990099] rounded-full py-[0.625rem] px-4 ml-auto'>
              <SearchIcon className='text-white' />
            </div>
          </div>
          <h1 className='mt-12 md:mt-14 text-white text-center text-2xl md:text-4xl lg:text-6xl font-semibold'>
            Gifting done with style
          </h1>
          <p className='mt-2 md:mt-6 lg:mt-8 text-white text-center text-xs md:text-xl lg:text-2xl leading-5 md:leading-8 lg:leading-10 font-semibold font-dm-sans'>
            Give a gift that let them pick what they truly love.
            <br />
            Simple, Flexible, and always the perfect choice
          </p>
          <Button
            className='w-full mt-8 md:mt-10 lg:mt-14 max-w-[9rem] md:max-w-[20rem] lg:max-w-[32rem] mx-auto 
            h-[2.5rem] md:h-[3rem] lg:h-[4.375rem] 
            text-sm md:text-base lg:text-xl 
            font-semibold rounded-full'>
            Send a gift
          </Button>
        </div>
      </section>
      <section>
        <h2 className='px-4 md:px-[2.5rem] lg:px-[3.75rem] mt-6 md:mt-[2.5rem] lg:mt-[3.75rem] text-center text-base md:text-[2rem] lg:text-[2.5rem] font-semibold'>
          Explore our collections of Gift cards
        </h2>
        <div className='grid md:mt-10 mt-3 gap-5 grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(17.5rem,1fr))] md:px-[3.125rem] container mx-auto px-5'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='p-5 border-[0.01875rem] border-[#D9D9D9] rounded-[1.875rem]'>
              <Image
                src={'https://placehold.co/280x140.png'}
                width={280}
                className='w-full h-[8.75rem]'
                height={140}
                alt=''
              />
              <div className=' border-black mt-6'>
                <p className='text-black text-base text-left font-normal font-montserrat'>
                  Zara gift card
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-7 md:mt-10 px-20'>
          <Button
            className='w-full max-w-[21.25rem] 
            h-[2.5rem] md:h-[3rem] lg:h-[3.9375rem] 
            text-sm md:text-base lg:text-xl 
            font-semibold'>
            Shop gift card
          </Button>
        </div>
      </section>
      <section className='md:mt-20 bg-primary mt-10 pt-[1.25rem] md:pt-[3.75rem]'>
        <h3 className='text-white text-xl md:text-2xl lg:text-[2.5rem] text-center font-semibold'>
          How it works
        </h3>
        <div className='mt-7 grid lg:gap-[5.625rem] gap-6 mx-auto md:grid-cols-3 container px-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='bg-gradient-to-r from-[#FF0066] rounded-[1.25rem] overflow-hidden to-[#D9D9D9] p-[0.05rem]'>
              <div className='bg-primary rounded-[1.25rem] md:px-6 px-5 py-[1.875rem]'>
                <MailIcon />
                <p className='md:text-xl lg:text-3xl font-bold text-white mt-1 font-montserrat'>
                  Choose
                </p>
                <p className='text-white mt-[0.375rem] text-sm md:text-sm font-dm-sans'>
                  Browse and select a gift card from top brands.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-8 md:mt-10 px-20 pb-[1.875rem] md:pb-[3.75rem]'>
          <Button
            className='w-full max-w-[21.25rem] 
            h-[2.5rem] md:h-[3rem] lg:h-[3.9375rem] 
            text-sm md:text-base lg:text-xl 
            font-semibold'>
            Shop gift card
          </Button>
        </div>
      </section>
      <section className='md:flex'>
        <div className='px-[1.875rem] md:px-[3.125rem] py-10 flex-1 self-center'>
          <div className=' max-w-[33.875rem] mx-auto'>
            <h3 className='text-2xl lg:text-4xl font-bold text-primary-text leading-[1.875rem] md:leading-[2.5rem]'>
              Grow Your Business with Giftoria
            </h3>
            <p className='mt-6 text-xs md:text-sm lg:text-base font-dm-sans'>
              Giftee makes gifting effortless—not just for customers but for
              businesses too! By joining our merchant network, you unlock a new
              revenue stream, attract more customers, and simplify gift card
              transactions
            </p>
            <Button
              className='w-full md:w-auto 
            h-[2.5rem] md:h-[3rem] lg:h-[3.9375rem] 
            px-6 md:px-8 lg:px-10
            text-sm md:text-base lg:text-xl 
            font-semibold mt-8'>
              Become a Merchant
            </Button>
          </div>
        </div>
        <div className='flex-1'>
          <Image
            src={'/assets/modern-waiter-desktop.png'}
            height={500}
            width={810}
            className='w-full lg:max-h-[37.5rem] h-full object-center aspect-[1.35]'
            alt='modern waiter'
          />
        </div>
      </section>
      <section className='px-6 bg-secondary-transparent py-[3.125rem]'>
        <div className='container mx-auto space-y-7 md:space-y-0 md:flex gap-[4.0625rem]'>
          {[
            {
              icon: <MoneyRemoveIcon />,
              title: 'No Gift Card? No Problem',
              description: (
                <span>
                  We’ll design and customize an e-gift card for your <br />{' '}
                  business on our platform at no extra cost.
                </span>
              ),
            },
            {
              icon: <CardTickIcon />,
              title: 'Buy Digital Gift Cards with Ease',
              description: (
                <span>
                  Offer digital gift cards and redeem <br /> them seamlessly
                  in-store
                </span>
              ),
            },
            {
              icon: <GlobeIcon />,
              title: 'Expand Your Reach',
              description: (
                <span>
                  Get discovered by more customers looking for <br /> the
                  perfect gift.
                </span>
              ),
            },
          ].map((item, index) => (
            <div key={index} className='font-montserrat flex-1'>
              <div className='p-[0.125rem] lg:p-[0.1875rem] bg-white rounded-full w-fit'>
                <div className='bg-secondary-transparent p-[0.125rem] lg:p-[0.1875rem] rounded-full'>
                  {item.icon}
                </div>
              </div>
              <h4 className='text-base text-[#101828] lg:text-2xl font-semibold mt-3'>
                {item.title}
              </h4>
              <p className='mt-2 leading-6 text-gray-500 text-sm  lg:text-base font-roboto'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className='container mx-auto'>
        <h2 className='text-center py-8 lg:py-[3.75rem] text-2xl md:text-3xl lg:text-[2.5rem] font-bold'>
          Frequently Asked Questions
        </h2>
        <FAQ
          questions={[
            {
              question: 'What is Giftee?',
              answer:
                'Giftee is a digital gift card platform that allows users to purchase and send gift cards from various brands to their friends and family.',
            },
          ]}
        />
      </section>
      <section className='mt-10'></section>
    </div>
  );
}
