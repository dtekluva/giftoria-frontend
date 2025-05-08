'use client';
import DragAndDropUpload from '@/components/custom/drag-n-drop';
import GiftCardDetailsTable from '@/components/custom/gift-card-details';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCompanyDashboardQuery } from '@/services/queries/company.queries';

const companyCardDetails = {
  'Business type:': 'Limited liability',
  'CAC registration number:': 'RC 1234567',
  'Date of incorporation:': '₦60,000',
  'Tin number:': '2345678-0001',
  'Company address:': 'No. 5 shomolu, Obanikoro, Lagos.',
};

function CompanyDetails() {
  const { query } = useGetCompanyDashboardQuery();

  if (query.isLoading) {
    return <CompanyDetailsSkeleton />;
  }

  return (
    <div className='pt-7 md:pt-9'>
      <DragAndDropUpload onUpload={(file) => console.log(file)} />
      <div className='border-t md:mt-6 mt-5 py-7 px-7 md:py-[30px] grid gap-5 md:gap-x-6 md:grid-cols-2'>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='name' className='text-xs font-medium'>
            Company Name
          </Label>
          <Input
            type='text'
            id='name'
            className='md:h-[50px]'
            placeholder='Shopybee Nigeria limited'
          />
        </div>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='email' className='text-xs font-medium'>
            Company Email
          </Label>
          <Input
            type='text'
            id='email'
            className='md:h-[50px]'
            placeholder='shopybee@gmail.com'
          />
        </div>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='phone_number' className='text-xs font-medium'>
            Company Phone Number
          </Label>
          <Input
            type='text'
            id='phone_number'
            className='md:h-[50px]'
            placeholder='+234 7038964802'
          />
        </div>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='name' className='text-xs font-medium'>
            Password
          </Label>
          <div>
            <Input
              type='text'
              id='name'
              className='md:h-[50px] bg-[#EDEEF2]'
              placeholder='xxxxxxxxxx'
            />
            <p className='text-right font-medium text-xs font-sans cursor-pointer mt-2 md:text-base text-[#990099]'>
              Request change of password
            </p>
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-[10px] px-7 md:mt-7'>
        <div>
          <h3 className='md:mb-8 mb-3 font-semibold'>Company Details</h3>
          <GiftCardDetailsTable data={companyCardDetails} />
        </div>
        <div className='flex flex-col items-end'>
          <Button className='md:h-16  ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
            Request Edit
          </Button>
          <p className='text-[10px] md:text-sm font-dm-sans mt-3 md:mt-4 text-[#4A4A68]'>
            Please not that any change to your document will require <br />
            verification and may require between 3-72 hours{' '}
          </p>
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
