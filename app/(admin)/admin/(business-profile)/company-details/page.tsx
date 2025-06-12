'use client';

import DragAndDropUpload from '@/components/custom/drag-n-drop';
import GiftCardDetailsTable from '@/components/custom/gift-card-details';
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
import {
  useUpdateCompanyDetails,
  useUploadCompanyLogoMutation,
} from '@/services/mutations/company.mutation';
import {
  useGetCompanyDashboardQuery,
  useGetCompanyLogoQuery,
} from '@/services/queries/company.queries';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

function CompanyDetails() {
  const { form, onSubmit } = useUpdateCompanyDetails();
  const { query } = useGetCompanyDashboardQuery();
  const { query: logoQuery } = useGetCompanyLogoQuery();
  const uploadLogoMutation = useUploadCompanyLogoMutation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const formData = new FormData();
        formData.append('company_logo', file, file.name);

        console.log('Uploading file:', {
          name: file.name,
          type: file.type,
          size: file.size,
        });

        uploadLogoMutation.mutate(formData, {
          onSuccess: (data) => {
            toast.success('Company logo updated successfully');
            console.log('Upload success:', data);
          },
          onError: (error) => {
            toast.error('Failed to update company logo');
            console.error('Upload error:', error);
          },
        });
      }
    },
    [uploadLogoMutation]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB max file size
  });

  if (query.isPending) {
    return <CompanyDetailsSkeleton />;
  }

  const companyCardDetails = {
    'Business type:': query.data?.business_type ?? '',
    'CAC registration number:': query.data?.cac_documents ?? '',
    'Date of incorporation:': query.data?.date_of_incorporation ?? '',
    'Tin number:': query.data?.tin_number ?? '',
    'Company address:': query.data?.company_address ?? '',
  };

  return (
    <div className='pt-7 md:pt-9'>
      <DragAndDropUpload onUpload={(file) => console.log(file)} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='border-t md:mt-6 mt-5 py-7 md:px-7 px-4 md:py-[30px] grid gap-5 md:gap-x-6 md:grid-cols-2'>
          {/* Company Name */}
          <FormField
            control={form.control}
            name='company_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Shopybee Nigeria limited'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Email */}
          <FormField
            control={form.control}
            name='company_email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>
                  Company Email
                </FormLabel>
                <FormControl>
                  <Input
                    defaultValue={''}
                    {...field}
                    placeholder='shopybee@gmail.com'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='+234 7038964802'
                    className='md:h-[50px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-medium'>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='xxxxxxxxxx'
                    className='md:h-[50px] bg-[#EDEEF2]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <p className='text-right font-medium text-xs font-sans cursor-pointer -mt-2 px-7 md:text-base text-[#990099]'>
        Request change of password
      </p>

      <div className='grid md:grid-cols-2 gap-[10px] px-4 md:px-7 md:mt-7 mt-7'>
        <div>
          <h3 className='md:mb-8 mb-3 font-semibold'>Company Details</h3>
          <GiftCardDetailsTable data={companyCardDetails} />
        </div>
        <div className='flex flex-col items-end'>
          <Button className='md:h-16 ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
            Request Edit
          </Button>
          <p className='text-[10px] md:text-sm font-dm-sans mt-3 md:mt-4 text-[#4A4A68]'>
            Please note that any change to your document will require <br />
            verification and may require between 3-72 hours
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <h3 className='text-lg font-semibold mb-4'>Company Logo</h3>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-primary'
            }`}>
          <input {...getInputProps()} />
          {logoQuery.isLoading ? (
            <div className='animate-pulse h-32 bg-gray-200 rounded-lg'></div>
          ) : logoQuery.data?.company_logo ? (
            <div className='relative'>
              <Image
                src={`data:image/jpeg;base64,${logoQuery.data.company_logo}`}
                alt='Company Logo'
                className='max-h-32 mx-auto'
                width={128}
                height={128}
                style={{ objectFit: 'contain' }}
              />
              <p className='mt-2 text-sm text-gray-500'>
                Click or drag to replace logo
              </p>
            </div>
          ) : (
            <div>
              <p className='text-gray-500'>
                {isDragActive
                  ? 'Drop the logo here'
                  : 'Drag and drop your company logo here, or click to select'}
              </p>
              <p className='text-sm text-gray-400 mt-2'>
                Supported formats: PNG, JPG, JPEG, GIF (max 5MB)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;

function CompanyDetailsSkeleton() {
  return (
    <div className='pt-7 md:pt-9 animate-pulse'>
      {/* Drag and Drop Skeleton */}
      <div className='h-32 bg-gray-300 rounded-md'></div>

      {/* Form Skeleton */}
      <div className='border-t md:mt-6 mt-5 py-7 px-7 md:py-[30px] grid gap-5 md:gap-x-6 md:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='space-y-2 font-dm-sans'>
            <div className='h-4 bg-gray-300 rounded-md w-1/3'></div>
            <div className='h-12 bg-gray-300 rounded-md'></div>
          </div>
        ))}
      </div>

      {/* Company Details Skeleton */}
      <div className='grid md:grid-cols-2 gap-[10px] px-7 md:mt-7'>
        <div>
          <div className='h-6 bg-gray-300 rounded-md w-1/4 mb-4'></div>
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className='flex justify-between items-center'>
                <div className='h-4 bg-gray-300 rounded-md w-1/3'></div>
                <div className='h-4 bg-gray-300 rounded-md w-1/2'></div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className='h-10 md:h-16 bg-gray-300 rounded-md w-1/3'></div>
          <div className='h-4 bg-gray-300 rounded-md w-2/3 mt-3 md:mt-4'></div>
        </div>
      </div>
    </div>
  );
}
