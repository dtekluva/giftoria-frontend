import AuthCard from '@/components/custom/auth-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function SignIn() {
  return (
    <div className='w-full'>
      <AuthCard title='Sign In'>
        <div className='space-y-2  font-dm-sans'>
          <Label htmlFor='email' className='text-base font-semibold'>
            Email
          </Label>
          <Input
            type='email'
            id='email'
            placeholder='Please enter your email'
          />
        </div>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='email' className='text-base font-semibold'>
            Password
          </Label>
          <Input
            type='email'
            id='email'
            isPassword
            placeholder='Please enter your password'
          />
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex items-center space-x-2 -mt-2 md:-mt-4'>
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
      </AuthCard>
    </div>
  );
}

export default SignIn;
