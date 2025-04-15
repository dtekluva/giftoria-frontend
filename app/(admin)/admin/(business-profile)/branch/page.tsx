import SearchInput from '@/components/custom/search-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function BranchPage() {
  return (
    <div className='md:px-7 px-5 md:pt-10 pt-6'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='name' className='text-xs font-medium'>
            Branch Name
          </Label>
          <Input
            type='text'
            id='name'
            className='md:h-[50px]'
            placeholder='Enter branch name'
          />
        </div>
        <div className='space-y-2 font-dm-sans'>
          <Label htmlFor='name' className='text-xs font-medium'>
            Branch Addess
          </Label>
          <Input
            type='text'
            id='name'
            className='md:h-[50px]'
            placeholder='Enter branch address'
          />
        </div>
      </div>
      <div className='md:mt-6 mt-7 flex justify-end'>
        <Button className='md:h-16  ml-auto md:px-[50px] px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans md:font-sans rounded-[6px] font-semibold md:mt-0'>
          Add Branch
        </Button>
      </div>
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
