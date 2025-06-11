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
import { useChangeForgotPassword } from '@/services/mutations/auth.mutations';

import EditIcon from '@/components/icon/edit-icon';

function ChangeForgotPassword() {
  const { form, onSubmit, isLoading } = useChangeForgotPassword();

  return (
    <div className='w-full'>
      <AuthCard title='Change Password'>
        <EditIcon className='max-w-fit mx-auto -mt-8' />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4 font-dm-sans'>
            <FormField
              control={form.control}
              name='otp_code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    OTP Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      {...field}
                      placeholder='Enter OTP code'
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
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      isPassword
                      placeholder='Enter your new password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirm_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      isPassword
                      placeholder='Confirm your new password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={!form.formState.isValid || isLoading}
              className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4'>
              Change Password
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default ChangeForgotPassword;
