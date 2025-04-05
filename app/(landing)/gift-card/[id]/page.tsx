import AddingShoppingIcon from '@/components/icon/add-shopping-icon';
import AIIcon from '@/components/icon/ai-icon';
import SendIcon from '@/components/icon/send-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React from 'react';

function GiftCardDetails() {
  return (
    <div className='mx-auto lg:container md:px-14 px-4 py-3 md:py-7'>
      <div className='border rounded-[10px] md:p-10 p-3 md:rounded-[20px] md:flex gap-[60px] font-dm-sans items-center space-y-4 md:space-y-0'>
        <Image
          src={'https://placehold.co/500x300.png'}
          width={500}
          className='w-full h-full aspect-[1.7] lg:max-w-[500px] max-h-[200px] md:max-h-[300px]'
          height={300}
          alt=''
        />
        <p className='lg:leading-[40px] md:leading-[20px] leading-[18px] lg:text-xl md:text-sm text-xs max-w-[585px]'>
          Looking for the perfect gift? Whether it’s fashion, electronics, home
          essentials, beauty products, or more, you’ll find it all with our
          exclusive gift cards! Looking for the perfect gift? Whether it’s
          fashion
        </p>
      </div>
      <div className='lg:grid grid-cols-2 md:gap-20 lg:gap-[120px]'>
        <div>
          <h1 className='text-[#160032] text-base md:text-2xl font-semibold md:font-bold md:mt-20 mt-7'>
            Recepient Information
          </h1>
          <div className='font-dm-sans mt-4 space-y-7 md:mt-10'>
            <div className='space-y-2'>
              <Label htmlFor='value'>Value</Label>
              <Input
                id='value'
                placeholder='Input gift card worth'
                className='md:h-12'
              />{' '}
              <div className='flex flex-row flex-wrap mt-4 md:mt-6 gap-3 cursor-pointer'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className='p-3 rounded-sm border transition-transform duration-300 hover:scale-105 hover:border-primary'>
                    <p>{(index + 1) * 10000}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='receipt_name'>Receipt Name</Label>
              <Input
                id='receipt_name'
                placeholder='Who are you sending the gift to?'
                className='md:h-12'
              />{' '}
            </div>
            <div className='flex gap-3'>
              <div className='space-y-2 flex-1'>
                <Label htmlFor='receipt_email'>Receipt Email</Label>
                <Input
                  id='receipt_email'
                  placeholder='receipt@gmail.com'
                  className='md:h-12'
                />{' '}
              </div>
              <div className='space-y-2 flex-1'>
                <Label htmlFor='receipt_phone_number'>
                  Receipt Phone Number
                </Label>
                <Input
                  id='receipt_phone_number'
                  placeholder='09131200194'
                  className='md:h-12'
                />{' '}
              </div>
            </div>
            <Button
              className='w-full md:h-[70px] h-10 font-semibold text-xs md:text-xl'
              variant={'outline'}>
              <AddingShoppingIcon />
              Add to cart and continue shoppping
            </Button>
          </div>
        </div>
        <div className='h-full flex flex-col'>
          <h1 className='text-[#160032] text-base md:text-2xl font-semibold md:font-bold md:mt-20 mt-7'>
            Personalize Gift
          </h1>
          <div className='font-dm-sans mt-4 space-y-7 md:mt-10 flex flex-col flex-1'>
            <div className='flex gap-3'>
              <div className='space-y-2 flex-1'>
                <Label htmlFor='receipt_email'>Who is it for?</Label>
                <Input
                  id='receipt_email'
                  placeholder='receipt@gmail.com'
                  className='md:h-12'
                />{' '}
              </div>
              <div className='space-y-2 flex-1'>
                <Label htmlFor='receipt_phone_number'>
                  What is the occassion
                </Label>
                <Input
                  id='receipt_phone_number'
                  placeholder='09131200194'
                  className='md:h-12'
                />{' '}
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='receipt_name'>Personalized Message</Label>
              <Textarea className='min-h-[74px] md:min-h-[126px] resize-none' />{' '}
            </div>
            <div className='bg-[#F6F3FB] py-3 flex flex-row gap-2 md:gap-5 items-center md:py-4 md:px-6 px-3 -mt-3 rounded-[10px]'>
              <AIIcon />
              <div className='flex-1'>
                <p className='text-sm text-[#675E8B]'>
                  Need inspiration?
                  <br /> Let our AI help craft the perfect message for you!
                </p>
              </div>
              <SendIcon />
            </div>
            <Button className='w-full md:h-[70px] h-10 font-semibold text-xs md:text-xl mt-auto'>
              Proceed to make payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardDetails;
