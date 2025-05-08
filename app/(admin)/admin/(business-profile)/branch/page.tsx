'use client';

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
import { Checkbox } from '@/components/ui/checkbox';
import { useBranchDetailsForm } from '@/services/mutations/company.mutation';
import SearchInput from '@/components/custom/search-input';

function BranchPage() {
  const { form, onSubmit, mutation } = useBranchDetailsForm();

  return (
    <div className='md:px-7 px-5 md:pt-10 pt-6'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid md:grid-cols-2 gap-6 font-dm-sans'>
          {/* Branch Name */}
          <FormField
            control={form.control}
            name='branch_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>
                  Branch Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter branch name'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Address */}
          <FormField
            control={form.control}
            name='branch_address'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>
                  Branch Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter branch address'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch ID */}
          <FormField
            control={form.control}
            name='branch_id'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>Branch ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter branch ID'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Password */}
          <FormField
            control={form.control}
            name='branch_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>
                  Branch Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='Enter branch password'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Is Active */}
          <FormField
            control={form.control}
            name='is_active'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-1'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className='text-xs font-medium'>
                  (Check this box if the branch is currently active)
                </FormLabel>
              </FormItem>
            )}
          />

          <div className='md:mt-6 mt-7 flex justify-end md:col-span-2'>
            <Button
              type='submit'
              disabled={mutation.isPending}
              className='md:h-16 ml-auto md:px-[50px] px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
              Add Branch
            </Button>
          </div>
        </form>
      </Form>

      <div className='md:mt-10 mt-[30px]'>
        <div className='flex md:items-center flex-col md:flex-row gap-1 justify-between'>
          <h3 className='md:mb-8 mb-3 md:text-xl font-semibold'>
            Branch Details
          </h3>
          <SearchInput />
        </div>
      </div>
    </div>
  );
}

export default BranchPage;
