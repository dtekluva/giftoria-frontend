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
import { useLogin } from '@/services/mutations';

function SignIn() {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <div className='w-full font-dm-sans'>
      <AuthCard title='Sign In'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4'>
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

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
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

            <Button
              variant={'outline'}
              className='text-sm font-bold md:text-base md:h-[70px] h-[50px] w-full'>
              Don&apos;t have an account? Sign up
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default SignIn;
