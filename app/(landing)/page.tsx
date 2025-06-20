'use client';
import { Card } from '@/components/custom/card';
import FAQ from '@/components/custom/faq';
import { GiftCardSearchBar } from '@/components/custom/gift-card-search-bar';
import CardTickIcon from '@/components/icon/card-tick-icon';
import GlobeIcon from '@/components/icon/global-icon';
import LocalMailIcon from '@/components/icon/local-mail-icon';
import MailIcon from '@/components/icon/mail-icon';
import MoneyRemoveIcon from '@/components/icon/money-remove-icon';
import ReceiveIcon from '@/components/icon/receive-icon';
import { Button } from '@/components/ui/button';
import { useGetAllBrandCardsQuery } from '@/services/queries/brand.queries';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const { query } = useGetAllBrandCardsQuery({ search: '' });
  const router = useRouter();

  return (
    <motion.div initial='hidden' animate='visible' variants={staggerContainer}>
      <motion.section
        className='relative md:bg-[url(/assets/hero-desktop-bg.png)] bg-[url(/assets/hero-mobile-bg.png)] bg-cover bg-no-repeat bg-center -mt-20'
        variants={fadeInUp}>
        <div className='bg-[#160032]/70 flex flex-col pt-20 md:pt-32 px-4 md:px-10 md:pb-[10.25rem] pb-20'>
          <motion.div
            className='lg:hidden flex bg-white z-50 rounded-full overflow-hidden max-w-[70%] mx-auto w-full'
            variants={fadeInUp}>
            <GiftCardSearchBar />
          </motion.div>
          <motion.h1
            className='mt-8 md:mt-14 text-white text-center text-2xl md:text-4xl lg:text-6xl font-semibold'
            variants={fadeInUp}>
            Gifting done with style
          </motion.h1>
          <motion.p
            className='mt-2 md:mt-6 lg:mt-8 text-white text-center text-xs md:text-xl lg:text-2xl leading-5 md:leading-8 lg:leading-10 font-semibold font-dm-sans'
            variants={fadeInUp}>
            Give a gift that let them pick what they truly love.
            <br />
            Simple, Flexible, and always the perfect choice
          </motion.p>
          <motion.div className='flex justify-center' variants={fadeInUp}>
            <Button
              onClick={() => {
                router.push('/gift-card');
              }}
              className='w-full mt-8 md:mt-10 lg:mt-14 max-w-[9rem] md:max-w-[20rem] lg:max-w-[32rem] mx-auto 
            h-[2.5rem] md:h-[3rem] lg:h-[4.375rem] 
            text-sm md:text-base lg:text-xl 
            font-semibold rounded-full'>
              Send a gift
            </Button>
          </motion.div>
        </div>
      </motion.section>
      <motion.section variants={fadeInUp}>
        <h2 className='px-4 md:px-[2.5rem] lg:px-[3.75rem] mt-6 md:mt-[2.5rem] lg:mt-[3.75rem] text-center text-base md:text-[2rem] lg:text-[2.5rem] font-semibold'>
          Explore our collections of Gift cards
        </h2>

        <div className='grid md:mt-10 mt-3 gap-5 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:px-[3.125rem] container mx-auto px-5'>
          {query.isPending &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='p-5 border-[0.01875rem] border-[#D9D9D9] rounded-[1.875rem] max-w-[320px] mx-auto w-full animate-pulse'>
                {/* Image placeholder */}
                <div className='w-full h-[140px] bg-gray-300 rounded-md'></div>

                {/* Text placeholder */}
                <div className='mt-6'>
                  <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                </div>
              </div>
            ))}
          {query?.data?.results.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
        <div className='flex justify-center mt-7 md:mt-10 px-20'>
          <Button
            onClick={() => {
              router.push('/gift-card');
            }}
            className='w-full max-w-[21.25rem] 
            h-[2.5rem] md:h-[3rem] lg:h-[3.9375rem] 
            text-sm md:text-base lg:text-xl 
            font-semibold'>
            Shop gift card
          </Button>
        </div>
      </motion.section>
      <motion.section
        className='md:mt-20 bg-primary mt-10 pt-[1.25rem] md:pt-[3.75rem]'
        variants={fadeInUp}>
        <h3 className='text-white text-xl md:text-2xl lg:text-[2.5rem] text-center font-semibold'>
          How it works
        </h3>
        <div className='mt-7 grid lg:gap-[4rem] md:gap-4 gap-6 mx-auto md:grid-cols-3 container px-4 lg:px-8'>
          {[
            {
              icon: <LocalMailIcon />,
              title: 'Choose',
              description: 'Browse and select a gift card from top brands.',
            },
            {
              icon: <MailIcon />,
              title: 'Send',
              description:
                'complete the purchase.  Add a personal message, enter their email, and send',
            },
            {
              icon: <ReceiveIcon />,
              title: 'Receive',
              description:
                'The recipient clicks "Receive" in their email to view the gift card and redeems it in-store',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className='bg-gradient-to-r from-[#FF0066] rounded-[1.25rem] overflow-hidden to-[#D9D9D9] p-[0.05rem]'
              variants={fadeInUp}>
              <div className='bg-primary rounded-[1.25rem] h-full md:px-6 px-5 py-[1.875rem]'>
                {item.icon}
                <p className='md:text-xl lg:text-3xl font-bold text-white mt-1 font-montserrat'>
                  {item.title}
                </p>
                <p className='text-white mt-[0.375rem] text-sm md:text-sm font-dm-sans'>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className='flex justify-center mt-8 md:mt-10 px-20 pb-[1.875rem] md:pb-[3.75rem]'>
          <Button
            onClick={() => {
              router.push('/gift-card');
            }}
            className='w-full max-w-[21.25rem] 
            h-[2.5rem] md:h-[3rem] lg:h-[3.9375rem] 
            text-sm md:text-base lg:text-xl 
            font-semibold'>
            Shop gift card
          </Button>
        </div>
      </motion.section>
      <motion.section className='relative' variants={fadeInUp}>
        <section className='md:flex container mx-auto gap-4'>
          <div className='md:px-4 lg:px-8 py-10 flex-1 self-center'>
            <div className='max-w-[33.875rem] px-[1.875rem] md:px-0'>
              <h3 className='text-2xl lg:text-4xl font-bold text-primary-text leading-[1.875rem] md:leading-[2.5rem] lg:leading-[50px]'>
                Grow Your Business with Giftoria
              </h3>
              <p className='mt-6 text-xs md:text-sm lg:text-base font-dm-sans'>
                Giftee makes gifting effortless—not just for customers but for
                businesses too! By joining our merchant network, you unlock a
                new revenue stream, attract more customers, and simplify gift
                card transactions
              </p>
              <Button
                onClick={() => {
                  router.push('/auth/admin/sign-up');
                }}
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
              height={600}
              width={810}
              className='w-full lg:max-h-[37.5rem] max-h-[390px] h-full object-fill'
              alt='modern waiter'
            />
          </div>
        </section>
      </motion.section>
      <motion.section
        className='px-6 bg-secondary-transparent py-[3.125rem]'
        variants={fadeInUp}>
        <div className='container mx-auto space-y-7 md:space-y-0 md:flex gap-[4.0625rem] flex-wrap'>
          {[
            {
              icon: <MoneyRemoveIcon />,
              title: 'No Gift Card? No Problem',
              description: (
                <span>
                  We&apos;ll design and customize an e-gift card for your <br />{' '}
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
      </motion.section>
      <motion.section className='container mx-auto' variants={fadeInUp}>
        <h2 className='text-center py-8 lg:py-[3.75rem] px-2 text-2xl md:text-3xl lg:text-[2.5rem] font-bold'>
          Frequently Asked Questions
        </h2>
        <FAQ
          questions={[
            {
              question: 'What is this platform about?',
              answer:
                'This platform allows you to buy and send digital gift cards from various trusted brands for birthdays, holidays, special milestones, or just to show appreciation.',
            },
            {
              question: 'How will the recipient receive the gift card?',
              answer:
                'All gift cards are delivered directly via email. Please ensure you enter the correct email address at checkout.',
            },
            {
              question:
                'Can I schedule a gift card to be delivered on a future date?',
              answer:
                'Yes! You can select a future delivery date and time during checkout, so your gift arrives right on time.',
            },
            {
              question: 'What brands do you offer?',
              answer:
                'We feature a variety of brands across categories like fashion, food, tech, gaming, and more. Visit our homepage to see the full list.',
            },
            {
              question: 'Can I personalize the gift card message?',
              answer:
                'Yes! You can include a custom message, which will be delivered with the gift card via email.',
            },
            {
              question: 'What payment methods do you accept?',
              answer:
                'We accept major debit and credit cards, as well as secure online payment methods.',
            },
            {
              question: 'Are there any fees for purchasing gift cards?',
              answer:
                'There are no additional or hidden fees. You pay only the gift card value unless stated during promotions.',
            },
            {
              question: 'Can the recipient use the gift card instantly?',
              answer:
                'Yes, once received, most gift cards can be used immediately based on the brand&apos;s redemption process.',
            },
            {
              question: 'Can a gift card be used more than once?',
              answer:
                'Yes. A gift card can be used multiple times across different purchases until the total value is fully used.',
            },
            {
              question: 'Do gift cards expire?',
              answer:
                'Yes. Each brand sets its own expiry policy, but most gift cards are valid for 1 to 2 years from the date of purchase.',
            },
            {
              question:
                'I entered the wrong recipient email. What should I do?',
              answer:
                'Contact us immediately at support@yourplatform.com. If the card hasn&apos;t been redeemed, we may be able to help you correct it.',
            },
            {
              question:
                'What if the recipient doesn&apos;t receive the gift card?',
              answer:
                'Ask them to check their spam or promotions folder. If not found within 15 minutes, contact us with your order ID.',
            },
            {
              question: 'Are gift cards refundable?',
              answer:
                'No. Digital gift cards are non-refundable once they are delivered.',
            },
            {
              question: 'Can I track the status of a gift card I sent?',
              answer:
                'Yes. You&apos;ll receive a confirmation email with status updates showing whether the card has been opened by the recipient.',
            },
          ]}
        />
      </motion.section>
    </motion.div>
  );
}
