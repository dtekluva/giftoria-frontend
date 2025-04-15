'use client';
import DragAndDropUpload from '@/components/custom/drag-n-drop';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function CompanyDetails() {
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
    </div>
  );
}

export default CompanyDetails;
