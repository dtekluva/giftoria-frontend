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
import { useCashierLogin, useLogin } from '@/services/mutations/auth.mutations';
import { useRouter } from 'next/navigation';

function CashierSignIn() {
  const { form, onSubmit, isLoading } = useCashierLogin();
  const router = useRouter();
  return (
    <div className='w-full font-dm-sans'>
      <AuthCard title=''>
        <h1 className='md:text-[30px] text-xl font-semibold -mt-6'>Sign In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4'>
            <FormField
              control={form.control}
              name='branch_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Branch ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Please enter your brach id'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Branch Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      isPassword
                      {...field}
                      placeholder='Please enter your password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4'
              disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default CashierSignIn;
