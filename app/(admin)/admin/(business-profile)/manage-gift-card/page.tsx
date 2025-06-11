'use client';

import OutlineEditIcon from '@/components/icon/outline-edit-icon';
import TrashOutlineIcon from '@/components/icon/trash-outline-icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import React from 'react';
import { useGetCategoriesQuery } from '@/services/queries/brand.queries';
import { useCreateBrand } from '@/services/mutations/brand.mutation';
import { Category } from '@/libs/types/brand.types';

function ManageGiftCardPage() {
  const { query: categoriesQuery } = useGetCategoriesQuery();
  const categories = categoriesQuery.data?.results || [];
  const { form, onSubmit, isLoading } = useCreateBrand();

  return (
    <div className='py-6'>
      <div className='flex justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='md:h-14 md:mx-7 mx-4 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
              Add Gift Card
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New Gift Card</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Brand Name</label>
                <Input
                  {...form.register('brand_name')}
                  placeholder='Enter brand name'
                />
                {form.formState.errors.brand_name && (
                  <p className='text-red-500 text-xs'>
                    {form.formState.errors.brand_name.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Category</label>
                <Select
                  onValueChange={(value) => form.setValue('category', value)}
                  value={form.watch('category')}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className='text-red-500 text-xs'>
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Minimum Amount</label>
                <Input
                  type='number'
                  {...form.register('min_amount', { valueAsNumber: true })}
                  placeholder='Enter minimum amount'
                />
                {form.formState.errors.min_amount && (
                  <p className='text-red-500 text-xs'>
                    {form.formState.errors.min_amount.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Maximum Amount</label>
                <Input
                  type='number'
                  {...form.register('max_amount', { valueAsNumber: true })}
                  placeholder='Enter maximum amount'
                />
                {form.formState.errors.max_amount && (
                  <p className='text-red-500 text-xs'>
                    {form.formState.errors.max_amount.message}
                  </p>
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  {...form.register('is_active')}
                  className='rounded border-gray-300'
                />
                <label className='text-sm font-medium'>Active</label>
              </div>

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Gift Card'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className='mt-5 border-t'>
        <li className='flex items-center justify-between space-y-4 lg:space-y-0 gap-4 pb-6 border-b md:px-7 px-4 py-5'>
          <div className='flex flex-col gap-4 md:gap-16 md:flex-row'>
            <div className='flex items-center gap-4 font-montserrat'>
              <Image
                src={'https://placehold.co/160x100.png'}
                width={160}
                height={100}
                className='md:w-[160px] w-24'
                alt=''
              />
              <div className='space-y-1 md:space-y-3'>
                <p className='md:text-sm text-[10px] font-semibold'>
                  Zara gift card
                </p>
                <p className='text-xs font-dm-sans'>Ashiru</p>
                <p className='md:text-xs text-[10px] xl:hidden block'>
                  2/10/2023
                </p>
              </div>
              <p className='md:text-sm text-[10px] hidden xl:block ml-auto'>
                {'adwaele@gmail.com'}
              </p>
            </div>
            <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
              <div className='px-3 md:py-5  py-3 bg-[#F6F3FB] rounded-[10px] max-w-[440px] flex-1'>
                <article className='text-[6px] md:text-[10px]'>
                  I love presenting gift
                </article>
              </div>
            </div>
          </div>

          <div className='md:flex-none flex md:flex-row flex-col items-center md:gap-12 flex-1'>
            <p className='text-xs font-dm-sans'>₦5,000 - ₦400,000.00</p>
            <div className='flex items-center'>
              <OutlineEditIcon className='cursor-pointer' />
              <button className='cursor-pointer'>
                <TrashOutlineIcon className='cursor-pointer ml-4' />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ManageGiftCardPage;
