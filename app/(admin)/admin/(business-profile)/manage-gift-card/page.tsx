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
import React, { useState, useReducer } from 'react';
import UploadDocumentIcon from '@/components/icon/upload-document-icon';
import { useGetCompanyBranches } from '@/services/queries/company.queries';
import { Switch } from '@/components/ui/switch';

interface Brand {
  id: string;
  brand_name: string;
  category: string;
  min_amount: number | null;
  max_amount: number | null;
  is_active: boolean;
  image?: string | null;
  description?: string;
  branches?: string[];
}

interface FormBrand {
  brand_name: string;
  category: string;
  min_amount?: number;
  max_amount?: number;
  is_active: boolean;
  image?: File | null;
  description?: string;
  branches?: string[];
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
  const [step, setStep] = useState(1);
  const [selectedBranches, setSelectedBranches] = useState<string[]>(
    initialData?.branches || []
  );

  // Fetch branches for step 2
  const { query: branchesQuery } = useGetCompanyBranches({
    search: '',
    page: 1,
    page_size: 100,
  });
  const branches = branchesQuery.data?.results || [];

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
        description: '',
        branches: [],
      });
    } else if (mode === 'edit' && initialData) {
      form.reset({
        brand_name: initialData.brand_name,
        category: initialData.category,
        min_amount: initialData.min_amount ?? 0,
        max_amount: initialData.max_amount ?? 0,
        is_active: initialData.is_active,
        image: initialData.image,
        description: initialData.description || '',
        branches: initialData.branches || [],
      });
      if (initialData.image) {
        setPreviewImage(initialData.image);
      }
      setSelectedBranches(initialData.branches || []);
    }
  }, [mode, initialData, form]);

  // Sync selectedBranches with form's branches field for validation and submission
  React.useEffect(() => {
    form.setValue('branches', selectedBranches, { shouldValidate: step === 2 });
  }, [selectedBranches, form, step]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file size is greater than 1MB
      if (file.size > 1024 * 1024) {
        alert('Image size should not exceed 1MB');
        e.target.value = ''; // Clear the file input
        return;
      }

      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    // Validate step 1
    const valid = await form.trigger([
      'brand_name',
      'category',
      'description',
      'is_active',
      'max_amount',
      'max_amount',
    ]);
    if (valid) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleBranchToggle = (branchId: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId)
        ? prev.filter((id) => id !== branchId)
        : [...prev, branchId]
    );
  };

  const handleSubmit = async (data: FormBrand) => {
    console.log(data, 'this is the date');
    if (step === 1) return handleNext();

    // Explicitly trigger validation for all fields, including branches
    const valid = await form.trigger();
    if (!valid) return;

    try {
      await onSubmit({ ...data, branches: selectedBranches } as any);
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
        {step === 1
          ? `Fill the details below to ${
              mode === 'create' ? 'create' : 'edit'
            } a Gift Card`
          : 'Below is a list of all your branches, toggle on the ones the gift card can be redeemed by your customers'}
      </p>
      <div className='md:mt-[30px] mt-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit as any)}
            className='md:space-y-6 space-y-4 font-dm-sans'>
            {step === 1 && (
              <>
                {/* Brand Name */}
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
                {/* Brand Image */}
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
                            {previewImage
                              ? 'Change image'
                              : 'Upload brand image'}
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
                {/* Category */}
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-12 w-full'>
                            <SelectValue placeholder='Select category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category: Category) => (
                            <SelectItem
                              className='uppercase font-dm-sans'
                              key={category.id}
                              value={category.id}>
                              {category.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Card Values */}
                <div className='flex gap-2'>
                  <FormField
                    control={form.control}
                    name='min_amount'
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>Card Value(Minimum)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter minimum amount'
                            className='md:h-12 flex-1'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            placeholder='Enter maximum amount'
                            className='md:h-12 flex-1'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Product Description */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder='Give a detailed description of your product or service'
                          className='w-full min-h-[80px] border rounded-md p-2 font-dm-sans'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Active Checkbox */}
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
                  type='button'
                  className='w-full h-12 font-semibold'
                  onClick={handleNext}
                  disabled={isLoading}>
                  Next
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <div className='space-y-4'>
                  {branchesQuery.isLoading ? (
                    <div>Loading branches...</div>
                  ) : branches.length === 0 ? (
                    <div>No branches found.</div>
                  ) : (
                    <table className='w-full'>
                      <thead>
                        <tr className='text-left'>
                          <th className='py-2'>S/N</th>
                          <th className='py-2'>Branch Address</th>
                          <th className='py-2'>Activate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {branches.map((branch: any, idx: number) => (
                          <tr key={branch.id} className='border-t'>
                            <td className='py-2'>{idx + 1}</td>
                            <td className='py-2'>{branch.branch_name}</td>
                            <td className='py-2'>
                              <Switch
                                checked={selectedBranches.includes(branch.id)}
                                onCheckedChange={() =>
                                  handleBranchToggle(branch.id)
                                }
                                className='w-8 h-[1.15rem]'
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className='flex gap-2 mt-6'>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1 h-12'
                    onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    type='submit'
                    className='flex-1 h-12 font-semibold'
                    disabled={isLoading}>
                    {isLoading
                      ? mode === 'create'
                        ? 'Creating...'
                        : 'Updating...'
                      : mode === 'create'
                      ? 'Create Gift Card'
                      : 'Update Gift Card'}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

function ManageGiftCardPage() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 4;

  // useReducer for modal/sheet state
  type ModalAction =
    | { type: 'OPEN_CREATE_DIALOG' }
    | { type: 'CLOSE_CREATE_DIALOG' }
    | { type: 'OPEN_CREATE_SHEET' }
    | { type: 'CLOSE_CREATE_SHEET' }
    | { type: 'OPEN_EDIT_DIALOG' }
    | { type: 'CLOSE_EDIT_DIALOG' }
    | { type: 'OPEN_EDIT_SHEET' }
    | { type: 'CLOSE_EDIT_SHEET' };
  type ModalState = {
    createDialog: boolean;
    createSheet: boolean;
    editDialog: boolean;
    editSheet: boolean;
  };
  const initialModalState: ModalState = {
    createDialog: false,
    createSheet: false,
    editDialog: false,
    editSheet: false,
  };
  function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
      case 'OPEN_CREATE_DIALOG':
        return { ...state, createDialog: true };
      case 'CLOSE_CREATE_DIALOG':
        return { ...state, createDialog: false };
      case 'OPEN_CREATE_SHEET':
        return { ...state, createSheet: true };
      case 'CLOSE_CREATE_SHEET':
        return { ...state, createSheet: false };
      case 'OPEN_EDIT_DIALOG':
        return { ...state, editDialog: true };
      case 'CLOSE_EDIT_DIALOG':
        return { ...state, editDialog: false };
      case 'OPEN_EDIT_SHEET':
        return { ...state, editSheet: true };
      case 'CLOSE_EDIT_SHEET':
        return { ...state, editSheet: false };
      default:
        return state;
    }
  }
  const [modalState, dispatchModal] = useReducer(
    modalReducer,
    initialModalState
  );

  const { query: brandsQuery } = useFetchBrandsQuery({
    search,
    page,
    page_size: pageSize,
  });

  const { deleteBrandById, isLoading: isDeleting } = useDeleteBrand();

  const handleEditClick = (brand: Brand) => {
    setSelectedBrand(brand);
    if (window.innerWidth < 768) {
      dispatchModal({ type: 'OPEN_EDIT_SHEET' });
    } else {
      dispatchModal({ type: 'OPEN_EDIT_DIALOG' });
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
        <Dialog
          open={modalState.createDialog}
          onOpenChange={(open) =>
            dispatchModal({
              type: open ? 'OPEN_CREATE_DIALOG' : 'CLOSE_CREATE_DIALOG',
            })
          }>
          <DialogTrigger asChild className='hidden md:block'>
            <Button
              className='md:h-14 md:mx-7 mx-4 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'
              onClick={() => dispatchModal({ type: 'OPEN_CREATE_DIALOG' })}>
              Create Gift Card
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[620px] overflow-y-auto max-h-[90%]'>
            <GiftCardForm
              mode='create'
              onSuccess={() => {
                dispatchModal({ type: 'CLOSE_CREATE_DIALOG' });
                dispatchModal({ type: 'CLOSE_CREATE_SHEET' });
              }}
            />
          </DialogContent>
        </Dialog>

        <Sheet
          open={modalState.createSheet}
          onOpenChange={(open) =>
            dispatchModal({
              type: open ? 'OPEN_CREATE_SHEET' : 'CLOSE_CREATE_SHEET',
            })
          }>
          <SheetTrigger asChild className='md:hidden'>
            <Button
              className='md:h-14 md:mx-7 mx-4 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'
              onClick={() => dispatchModal({ type: 'OPEN_CREATE_SHEET' })}>
              Create Gift Card
            </Button>
          </SheetTrigger>
          <SheetContent className='max-h-full overflow-y-auto' side='bottom'>
            <GiftCardForm
              mode='create'
              onSuccess={() => {
                dispatchModal({ type: 'CLOSE_CREATE_DIALOG' });
                dispatchModal({ type: 'CLOSE_CREATE_SHEET' });
              }}
            />
          </SheetContent>
        </Sheet>

        {/* Edit Dialog */}
        <Dialog
          open={modalState.editDialog}
          onOpenChange={(open) =>
            dispatchModal({
              type: open ? 'OPEN_EDIT_DIALOG' : 'CLOSE_EDIT_DIALOG',
            })
          }>
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
        <Sheet
          open={modalState.editSheet}
          onOpenChange={(open) =>
            dispatchModal({
              type: open ? 'OPEN_EDIT_SHEET' : 'CLOSE_EDIT_SHEET',
            })
          }>
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
          onDebouncedChange={setSearch}
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
                {/* <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
                  <div className='px-3 md:py-5  py-3 bg-[#F6F3FB] rounded-[10px] max-w-[440px] flex-1'>
                    <article className='text-[6px] md:text-[10px]'>
                      I love presenting gift
                    </article>
                  </div>
                </div> */}
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
        <div className='flex justify-center gap-2 mt-4 font-dm-sans px-4 md:px-7'>
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
