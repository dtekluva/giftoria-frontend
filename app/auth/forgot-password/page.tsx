'use client';

import AuthCard from '@/components/custom/auth-card';
import SMSIcon from '@/components/icon/smss-icon';
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
import { useForgotPassword } from '@/services/mutations/auth.mutations';
import { useRouter } from 'next/navigation';

function ForgotPassword() {
  const { form, onSubmit, isLoading } = useForgotPassword();
  const router = useRouter();
  return (
    <div className='w-full'>
      <AuthCard title='Email Address'>
        <SMSIcon className='max-w-fit mx-auto -mt-2' />
        <p className='font-dm-sans text-center'>
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4 font-dm-sans'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                      placeholder='Please enter your email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={!form.formState.isValid || isLoading}
              className='text-base w-full  font-semibold md:h-[70px] h-[50px] mt-4'>
              Continue
            </Button>
            <Button
              variant={'outline'}
              disabled={isLoading}
              type='button'
              onClick={() => router.push('/auth/sign-up')}
              className='text-sm font-bold md:text-base md:h-[70px] h-[50px] w-full'>
              Don&apos;t have an account? Sign up
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default ForgotPassword;
