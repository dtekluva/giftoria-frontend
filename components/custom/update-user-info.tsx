'use client';
import ProfileIcon from '@/components/icon/profile-icon';
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
import { useUpdateUserProfile } from '@/services/mutations/auth.mutations';

function UpdateUserInfo() {
  const { form, onSubmit, userData } = useUpdateUserProfile();

  return (
    <div className='w-full font-dm-sans'>
      <div className='flex items-center gap-4 pb-4 border-b md:pb-6'>
        <ProfileIcon />
        <h1 className='font-bold md:text-base text-sm'>
          {userData?.data.first_name} {userData?.data.last_name}
        </h1>
      </div>
      <div className='md:mt-7 mt-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='flex-1'>
                <FormField
                  control={form.control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold text-gray-700'>
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='max-h-[50px]'
                          type='text'
                          {...field}
                          placeholder='Enter your first name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex-1'>
                <FormField
                  control={form.control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold text-gray-700'>
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='max-h-[50px]'
                          type='text'
                          {...field}
                          placeholder='Enter your last name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='flex-1'>
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
                          className='max-h-[50px]'
                          type='email'
                          {...field}
                          placeholder='Enter your email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex-1'>
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
                          className='max-h-[50px]'
                          type='tel'
                          {...field}
                          placeholder='Enter your phone number'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className='text-right font-medium text-xs font-sans cursor-pointer  px-7 mt-1 md:text-base text-[#990099]'>
                  Request change of password
                </p>
              </div>
            </div>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='text-base w-full md:w-auto md:ml-auto font-semibold mt-4'>
                Update Information
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateUserInfo;
