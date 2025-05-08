'use client';
import OrderHistoryTable from '@/components/custom/order-history';
import SearchInput from '@/components/custom/search-input';
import DirectionDefaultIcon from '@/components/icon/direction-default-icon';
import SendIcon from '@/components/icon/send-icon';
import SMSIcon from '@/components/icon/sms-icon';
import SMSNotificationIcon from '@/components/icon/sms-notification-icon';
import SmsStarIcon from '@/components/icon/sms-star-icon';
import SMSTrackingIcon from '@/components/icon/sms-tracking-icon';
import { Input } from '@/components/ui/input';
import React from 'react';

// const cards = [
//   {

//   }
// ]

function AdminPage() {
  return (
    <div>
      <div className='px-4 pt-6'>
        <h2 className='text-base md:hidden font-semibold'>Gift Card Orders</h2>
        <div className='flex items-center border py-1 px-1 rounded-[8px] md:mt-0 mt-6 max-w-[400px] mx-auto pr-6'>
          <Input
            type='text'
            className='border-none flex-1 md:h-[50px] font-nunito'
            placeholder='Enter gift card unique code'
          />
          <SendIcon />
        </div>
      </div>
      <div className='md:mt-7 mt-5 border-t-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-10 py-5'>
        <div className='container mx-auto'>
          <div className='container max-w-full mx-auto grid md:gap-5 gap-4 grid-cols-[repeat(auto-fit,minmax(216px,1fr))]'>
            <Card title='Sent' icon={<SMSTrackingIcon />} value='44' />
            <Card title='Claimed' icon={<DirectionDefaultIcon />} value='20' />
            <Card title='Redeemed' icon={<SmsStarIcon />} value='14' />
            <Card title='Pending' icon={<SMSIcon />} value='20' />
            <Card title='Declined' icon={<SMSNotificationIcon />} value='54' />
          </div>
        </div>
      </div>
      <div className='border-t-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-8 py-5'>
        <div className='container mx-auto'>
          <div className='flex md:flex-row flex-col gap-5 md:items-center justify-between'>
            <h3 className='text-base md:text-[1.25rem] font-semibold'>
              Order History
            </h3>
            <SearchInput />
          </div>
        </div>
        <OrderHistoryTable />
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  function getTitleColor(title: string) {
    switch (title.toLowerCase()) {
      case 'sent':
        return 'text-[#259C80]';
      case 'claimed':
        return 'text-[#13ACF3]';
      case 'redeemed':
        return 'text-[#4E00AD]';
      case 'pending':
        return 'text-[#E5A300]';
      case 'declined':
        return 'text-[#F97878]';

      default:
        return '#000000';
    }
  }
  return (
    <div className='border md:py-5 md:pl-[46px] cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out md:pr-[66px] py-4 px-10 rounded-[10px] flex gap-3 items-center'>
      {icon}
      <div className=''>
        <h3 className='md:text-2xl text-xl font-semibold text-[#0E0E2C] md:text-right'>
          {value}
        </h3>
        <p
          className={`text-sm font-dm-sans font-medium ${getTitleColor(
            title
          )}`}>
          {title}
        </p>
      </div>
    </div>
  );
}

export default AdminPage;
