import AuthCard from '@/components/custom/auth-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function SignIn() {
  return (
    <div className='w-full'>
      <AuthCard title='Sign In'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' placeholder='Email' />
        </div>
      </AuthCard>
    </div>
  );
}

export default SignIn;
