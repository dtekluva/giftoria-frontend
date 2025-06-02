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
import { useChangePassword } from '@/services/mutations/auth.mutations';

function ResetPassword() {
  const { form, onSubmit, isLoading } = useChangePassword();
  return (
    <div className='w-full'>
      <AuthCard title='Reset Password'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4 font-dm-sans'>
            <FormField
              control={form.control}
              name='old_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      placeholder='Enter your old password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='new_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      placeholder='Enter your new password'
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
              Reset Password
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default ResetPassword;
