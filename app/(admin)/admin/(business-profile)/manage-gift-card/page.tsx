'use client';

import OutlineEditIcon from '@/components/icon/outline-edit-icon';
import TrashOutlineIcon from '@/components/icon/trash-outline-icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

function CreateGiftCardForm() {
  const { query: categoriesQuery } = useGetCategoriesQuery();
  const categories = categoriesQuery.data?.results || [];
  const { form, onSubmit, isLoading } = useCreateBrand();

  return (
    <div className='px-7 py-10 md:px-0 md:py-1'>
      <h2 className='font-semibold text-base md:text-2xl font-sans'>
        Create Gift Card
      </h2>
      <p className='text-xs md:text-base text-[#4A4A68] font-dm-sans border-b pb-4'>
        Fill the details below to create a Gift Card
      </p>
      <div className='md:mt-[30px] mt-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-6 space-y-4 font-dm-sans'>
            <FormField
              control={form.control}
              name='brand_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter brand name'
                      className='md:h-12'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className='h-12 w-full'>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='min_amount'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Card Value(Minimum)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter minimum amount'
                        className='md:h-12 flex-1'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='max_amount'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Card Value(Maximum)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter maximum amount'
                        className='md:h-12 flex-1'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='is_active'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-0'>
                  <FormControl>
                    <input
                      type='checkbox'
                      checked={field.value}
                      onChange={field.onChange}
                      className='rounded border-gray-300'
                    />
                  </FormControl>
                  <FormLabel className='!mt-0'>Active</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full h-12 font-semibold'
              disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Gift Card'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function ManageGiftCardPage() {
  return (
    <div className='py-6'>
      <div className='flex justify-end'>
        <Dialog>
          <DialogTrigger asChild className='hidden md:block'>
            <Button className='md:h-14 md:mx-7 mx-4 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
              Create Gift Card
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[620px] overflow-y-auto max-h-[90%]'>
            <CreateGiftCardForm />
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild className='md:hidden'>
            <Button className='md:h-14 md:mx-7 mx-4 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
              Create Gift Card
            </Button>
          </SheetTrigger>
          <SheetContent className='max-h-full overflow-y-auto' side='bottom'>
            <CreateGiftCardForm />
          </SheetContent>
        </Sheet>
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
