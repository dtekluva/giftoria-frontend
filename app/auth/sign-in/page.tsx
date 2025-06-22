'use client';

import AuthCard from '@/components/custom/auth-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PASSWORD_REQUIREMENTS } from '@/libs/schema';
import { useLogin } from '@/services/mutations/auth.mutations';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SignIn() {
  const { form, onSubmit, isLoading } = useLogin();
  const router = useRouter();
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
            <div>
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
                        isPassword
                        {...field}
                        placeholder='Please enter your password'
                      />
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm text-gray-500 mt-1'>
                      {PASSWORD_REQUIREMENTS.message}
                    </p>
                  </FormItem>
                )}
              />
              <div className='flex justify-between mt-3 '>
                <div className='flex items-center gap-2'>
                  <Checkbox id='keep-logged-in' />
                  <Label className='text-[#667085]' htmlFor='keep-logged-in'>
                    Keep me logged in
                  </Label>
                </div>
                <Link
                  className='text-primary font-semibold'
                  href={'/auth/forgot-password'}>
                  Reset Password
                </Link>
              </div>
            </div>

            <Button
              type='submit'
              className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4'
              disabled={!form.formState.isValid || isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Button
              variant={'outline'}
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

export default SignIn;
