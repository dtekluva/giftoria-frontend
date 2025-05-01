'use client';

import AuthCard from '@/components/custom/auth-card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useSendVerificationCode,
  useVerifyEmail,
} from '@/services/mutations/auth.mutations';
import { useRouter } from 'next/navigation';
import React from 'react';

function VerifyEmail() {
  const { form, onSubmit, mutation } = useVerifyEmail();
  const { resendCode, isLoading: isResending } = useSendVerificationCode();
  const router = useRouter();
  const email = localStorage.getItem('verify-mail') as string;

  React.useEffect(() => {
    if (mutation.isSuccess) {
      router.push('/auth/sign-in/');
    }
  }, [mutation.isSuccess, router]);

  return (
    <div className='w-full'>
      <AuthCard title='Verify Email'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <h1 className='md:text-2xl'>
                To keep your account safe we need to <br /> verify your email
                address
              </h1>
              <p className='mt-4 md:mt-7 font-dm-sans'>
                Check your email, we sent an OTP to your email
                <br /> <span className='font-bold'>{email}</span>
              </p>
            </div>

            <FormField
              control={form.control}
              name='otp_code'
              render={({ field }) => (
                <FormItem className='flex md:flex-row flex-col gap-4 mt-9'>
                  <div className='space-y-2 flex-1 font-dm-sans'>
                    <FormLabel className='text-base font-semibold text-gray-700'>
                      Enter Code
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Please enter OTP code' />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <button
              type='button'
              onClick={resendCode}
              disabled={isResending}
              className='font-dm-sans font-medium text-base md:mt-4 mt-3 text-primary cursor-pointer'>
              {isResending ? 'Sending...' : 'Request the code again'}
            </button>
            <p className='md:mt-7 mt-5 font-dm-sans'>
              Remember to check your spam/junk folder. It can take several
              minutes for your email to arrive, but if you don&apos;t see the
              mail after 5 minutes
            </p>
            <p className='md:mt-5 mt-3 font-dm-sans'>
              If you do request the code to be re-sent, makes sure you enter it
              on this page as signing it again will generate a different code
            </p>
            <Button
              type='submit'
              className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4'
              disabled={mutation.isPending}>
              {mutation.isPending ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button
              variant={'outline'}
              className='text-sm font-bold md:text-base md:h-[70px] h-[50px] mb-10 mt-5 w-full'>
              Back to Create Account
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default VerifyEmail;
