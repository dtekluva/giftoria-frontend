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
import { useCreateUserAccount } from '@/services/mutations/auth.mutations';

function CreateAccount() {
  const { form, onSubmit, isLoading } = useCreateUserAccount();

  return (
    <div className='w-full'>
      <AuthCard title='Create Account'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4'>
            <div className='flex md:flex-row flex-col gap-4'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='text-base font-semibold text-gray-700'>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please enter your first name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel className='text-base font-semibold text-gray-700'>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Please enter your last name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              name='phone_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Please enter your phone number'
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

            <FormField
              control={form.control}
              name='promotion_notification'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-2 -mt-2 md:-mt-4 cursor-pointer'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='text-xs font-dm-sans'>
                    Notify me of new deals and offers from your Partners
                  </FormLabel>
                </FormItem>
              )}
            />

            <p className='text-xs font-dm-sans'>
              By creating an account, you agree to the Giftoria terms and
              conditions. John Lewis will process your personal data as set out
              in our privacy notice.
            </p>

            <Button
              type='submit'
              className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4'
              disabled={!form.formState.isValid || isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
}

export default CreateAccount;
