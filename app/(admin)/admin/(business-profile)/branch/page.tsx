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
import {
  useBranchDetailsForm,
  useDeleteBranch,
} from '@/services/mutations/company.mutation';
import SearchInput from '@/components/custom/search-input';
import TransactionHistoryTable from '@/components/custom/transaction-history-table';
import { useState } from 'react';
import { useGetCompanyBranches } from '@/services/queries/company.queries';
import { MY_ORDER_PAGE_SIZE } from '@/libs/constants';

function BranchPage() {
  const { form, onSubmit, mutation } = useBranchDetailsForm();

  const [currentPage, setCurrentPage] = useState(1);

  const { deleteBranchMutate } = useDeleteBranch(currentPage);

  const { query, prefetchQuery } = useGetCompanyBranches({
    search: '',
    page: currentPage,
    page_size: MY_ORDER_PAGE_SIZE,
  });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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

      {query && query.isSuccess && (
        <div className='md:mt-10 mt-[30px]'>
          <div className='flex md:items-center flex-col md:flex-row gap-1 justify-between'>
            <h3 className='md:mb-8 mb-3 md:text-xl font-semibold'>
              Branch Details
            </h3>
            <SearchInput />
          </div>
          <TransactionHistoryTable
            prefetchQuery={prefetchQuery}
            data={query.data?.results.map((branch) => ({
              branch_name: branch.branch_name,
              branch_address: branch.branch_address,
              branch_id: branch.branch_id,
              branch_password: branch.branch_password,
            }))}
            header={
              Object.keys(query.data?.results[0])
                .filter((key) => key !== 'is_active' && key !== 'id')
                .map((key) => ({
                  title: key
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase()),
                  key: key,
                })) ?? []
            }
            showAction
            action={(id) => {
              deleteBranchMutate(id);
            }}
            next={!!query.data?.next}
            currentPage={currentPage}
            totalPages={Math.ceil(query.data?.count / MY_ORDER_PAGE_SIZE)}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      )}
    </div>
  );
}

export default BranchPage;
