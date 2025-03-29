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
            <label
              htmlFor='logged-in'
              className='text-xs text-muted-foreground'>
              Keep me logged in
            </label>
          </div>
          <button className='text-[#990099] text-xs font-semibold'>
            Reset Password
          </button>
        </div>
        <Button className='text-base font-semibold md:h-[70px] h-[50px] mt-4'>
          Make Payment
        </Button>
        <Button variant={'outline'} className='text-xs md:h-[70px] h-[50px]'>
          Don&apos;t have an account ?{''}
          <span className='font-semibold text-base'>Sign up</span>
        </Button>
      </AuthCard>
    </div>
  );
}

export default CreateAccount;
