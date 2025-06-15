/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import OutlineEditIcon from '@/components/icon/outline-edit-icon';
import TrashOutlineIcon from '@/components/icon/trash-outline-icon';
import SearchInput from '@/components/custom/search-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Category } from '@/libs/types/brand.types';
import {
  useCreateBrand,
  useEditBrand,
  useDeleteBrand,
} from '@/services/mutations/brand.mutation';
import {
  useFetchBrandsQuery,
  useGetCategoriesQuery,
} from '@/services/queries/brand.queries';
import Image from 'next/image';
import React, { useState } from 'react';
import UploadDocumentIcon from '@/components/icon/upload-document-icon';

interface Brand {
  id: string;
  brand_name: string;
  category: string;
  min_amount: number | null;
  max_amount: number | null;
  is_active: boolean;
  image?: string | null;
}

interface FormBrand {
  brand_name: string;
  category: string; // Required UUID
  min_amount?: number; // Optional, minimum 0
  max_amount?: number; // Optional, minimum 0
  is_active: boolean;
  image?: File | null;
}

interface GiftCardFormProps {
  mode: 'create' | 'edit';
  brandId?: string;
  initialData?: Brand;
  onSuccess?: () => void;
}

function GiftCardForm({
  mode,
  brandId,
  initialData,
  onSuccess,
}: GiftCardFormProps) {
  const { query: categoriesQuery } = useGetCategoriesQuery();
  const categories = categoriesQuery.data?.results || [];
  const createMutation = useCreateBrand();
  const editMutation = useEditBrand(brandId || '');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { form, onSubmit, isLoading } =
    mode === 'create' ? createMutation : editMutation;

  // Initialize form with default values
  React.useEffect(() => {
    if (mode === 'create') {
      form.reset({
        brand_name: '',
        category: '',
        min_amount: 0,
        max_amount: 0,
        is_active: true,
        image: null,
      });
    } else if (mode === 'edit' && initialData) {
      form.reset({
        brand_name: initialData.brand_name,
        category: initialData.category,
        min_amount: initialData.min_amount ?? 0,
        max_amount: initialData.max_amount ?? 0,
        is_active: initialData.is_active,
        image: initialData.image ? new File([], initialData.image) : null,
      });
      if (initialData.image) {
        setPreviewImage(initialData.image);
      }
    }
  }, [mode, initialData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: FormBrand) => {
    console.log('Form data before submission:', data); // Debug log

    // Validate required fields
    if (!data.brand_name || !data.category) {
      console.error('Missing required fields:', {
        brand_name: data.brand_name,
        category: data.category,
      });
      return;
    }

    try {
      await onSubmit(data as any);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='px-7 py-10 md:px-0 md:py-1'>
      <h2 className='font-semibold text-base md:text-2xl font-sans'>
        {mode === 'create' ? 'Create Gift Card' : 'Edit Gift Card'}
      </h2>
      <p className='text-xs md:text-base text-[#4A4A68] font-dm-sans border-b pb-4'>
        Fill the details below to {mode === 'create' ? 'create' : 'edit'} a Gift
        Card
      </p>
      <div className='md:mt-[30px] mt-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit as any)}
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
              name='image'
              render={() => (
                <FormItem>
                  <FormLabel>Brand Image</FormLabel>
                  <div className='flex items-center gap-4'>
                    <label
                      htmlFor='brand-image'
                      className='md:px-6 px-5 flex items-center gap-4 cursor-pointer py-4 rounded-[8px] bg-secondary-transparent'>
                      <UploadDocumentIcon />
                      <p className='font-medium font-dm-sans text-[#323232] text-sm'>
                        {previewImage ? 'Change image' : 'Upload brand image'}
                      </p>
                    </label>
                    <input
                      id='brand-image'
                      type='file'
                      accept='image/jpeg,image/png,image/jpg,image/gif,image/webp'
                      className='hidden'
                      onChange={handleImageChange}
                    />
                    {previewImage && (
                      <div className='relative w-20 h-20'>
                        <Image
                          src={previewImage}
                          alt='Brand preview'
                          fill
                          className='object-cover rounded-lg'
                        />
                      </div>
                    )}
                  </div>
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
              {isLoading
                ? mode === 'create'
                  ? 'Creating...'
                  : 'Updating...'
                : mode === 'create'
                ? 'Create Gift Card'
                : 'Update Gift Card'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function ManageGiftCardPage() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { query: brandsQuery } = useFetchBrandsQuery({
    search,
    page,
    page_size: pageSize,
  });

  const { deleteBrandById, isLoading: isDeleting } = useDeleteBrand();

  const handleEditClick = (brand: Brand) => {
    setSelectedBrand(brand);
    if (window.innerWidth < 768) {
      setIsEditSheetOpen(true);
    } else {
      setIsEditDialogOpen(true);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteClick = async (brandId: string) => {
    if (window.confirm('Are you sure you want to delete this gift card?')) {
      await deleteBrandById(brandId);
    }
  };

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
            <GiftCardForm mode='create' />
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild className='md:hidden'>
            <Button className='md:h-14 md:mx-7 mx-4 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
              Create Gift Card
            </Button>
          </SheetTrigger>
          <SheetContent className='max-h-full overflow-y-auto' side='bottom'>
            <GiftCardForm mode='create' />
          </SheetContent>
        </Sheet>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className='sm:max-w-[620px] overflow-y-auto max-h-[90%]'>
            <DialogTitle className='sr-only'>Edit Gift Card</DialogTitle>
            {selectedBrand && (
              <GiftCardForm
                mode='edit'
                brandId={selectedBrand.id}
                initialData={selectedBrand}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Sheet */}
        <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <SheetContent className='max-h-full overflow-y-auto' side='bottom'>
            <DialogTitle className='sr-only'>Edit Gift Card</DialogTitle>
            {selectedBrand && (
              <GiftCardForm
                mode='edit'
                brandId={selectedBrand.id}
                initialData={selectedBrand}
              />
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Input */}
      <div className='px-4 md:px-7 mt-4 max-w-[380px]'>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search gift cards...'
          className='max-w-sm'
        />
      </div>

      <ul className='mt-5 border-t'>
        {brandsQuery.isLoading ? (
          <li className='px-4 md:px-7 py-8 text-center text-gray-500'>
            Loading gift cards...
          </li>
        ) : brandsQuery.data?.results.length === 0 ? (
          <li className='px-4 md:px-7 py-8 text-center font-sora'>
            <div className='text-gray-500 mb-2 font-medium  '>
              No gift cards found
            </div>
            <p className='text-sm text-gray-400'>
              {search
                ? 'Try adjusting your search or create a new gift card'
                : 'Create your first gift card to get started'}
            </p>
          </li>
        ) : (
          brandsQuery.data?.results.map((brand) => (
            <li
              key={brand.id}
              className='flex items-center justify-between space-y-4 lg:space-y-0 gap-4 pb-6 border-b md:px-7 px-4 py-5'>
              <div className='flex flex-col gap-4 md:gap-16 md:flex-row'>
                <div className='flex items-center gap-4 font-montserrat'>
                  <Image
                    src={brand.image}
                    width={160}
                    height={100}
                    className='md:w-[160px] w-24'
                    alt=''
                  />
                  <div className='space-y-1 md:space-y-3'>
                    <p className='md:text-sm text-[10px] font-semibold'>
                      {brand.brand_name}
                    </p>
                    <p className='text-xs font-dm-sans'>{brand.category}</p>
                    {/* <p className='md:text-xs text-[10px] xl:hidden block'>
                    {brand.}
                    </p> */}
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
                <p className='text-xs font-dm-sans'>
                  ₦{brand.min_amount?.toLocaleString()} - ₦
                  {brand.max_amount?.toLocaleString()}
                </p>
                <div className='flex items-center'>
                  <OutlineEditIcon
                    className='cursor-pointer'
                    onClick={() => handleEditClick(brand)}
                  />
                  <button
                    className='cursor-pointer'
                    onClick={() => handleDeleteClick(brand.id)}
                    disabled={isDeleting}>
                    <TrashOutlineIcon className='cursor-pointer ml-4' />
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Pagination */}
      {brandsQuery.data && brandsQuery.data.results.length > 0 && (
        <div className='flex justify-center gap-2 mt-4 px-4 md:px-7'>
          <Button
            variant='outline'
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || brandsQuery.isLoading}>
            Previous
          </Button>
          <Button
            variant='outline'
            onClick={() => handlePageChange(page + 1)}
            disabled={!brandsQuery.data.next || brandsQuery.isLoading}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default ManageGiftCardPage;
