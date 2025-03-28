import AuthCard from '@/components/custom/auth-card';
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
            placeholder='Please enter your password'
          />
        </div>
      </AuthCard>
    </div>
  );
}

export default SignIn;
