import AuthCard from '@/components/custom/auth-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function CreateAccount() {
  return (
    <div className='w-full'>
      <AuthCard title='Create Account'>
        <div className='flex md:flex-row flex-col gap-4'>
          <div className='space-y-2 flex-1 font-dm-sans'>
            <Label
              htmlFor='first_name'
              className='text-base font-semibold text-gray-700'>
              First Name
            </Label>
            <Input id='first_name' placeholder='Please enter your first name' />
          </div>
          <div className='space-y-2 flex-1 font-dm-sans'>
            <Label htmlFor='last_name' className='text-base font-semibold'>
              Last Name
            </Label>
            <Input id='last_name' placeholder='Please enter your last name' />
          </div>
        </div>
        <div className='flex md:flex-row flex-col gap-4'>
          <div className='space-y-2 flex-1 font-dm-sans'>
            <Label
              htmlFor='email'
              className='text-base font-semibold text-gray-700'>
              Email
            </Label>
            <Input
              type='email'
              id='email'
              placeholder='Please enter your first name'
            />
          </div>
          <div className='space-y-2 flex-1 font-dm-sans'>
            <Label htmlFor='last_name' className='text-base font-semibold'>
              Last Name
            </Label>
            <Input id='last_name' placeholder='Please enter your last name' />
          </div>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex items-center space-x-2 -mt-2 md:-mt-4 cursor-pointer'>
            <Checkbox id='logged-in' />
            <label htmlFor='logged-in' className='text-xs font-dm-sans'>
              Notify me of new deals and offers from your Partners
            </label>
          </div>
        </div>
        <p className='text-xs font-dm-sans'>
          By creating an account, you agree to the Giftoria terms and
          conditions. John Lewis will process your personal data as set out in
          our privacy notice
        </p>
        <Button className='text-base font-semibold md:h-[70px] h-[50px] mt-4'>
          Create Account
        </Button>
        <Button variant={'outline'} className='text-xs md:h-[70px] h-[50px]'>
          <span className='font-semibold text-base'>Skip</span>
        </Button>
      </AuthCard>
    </div>
  );
}

export default CreateAccount;
