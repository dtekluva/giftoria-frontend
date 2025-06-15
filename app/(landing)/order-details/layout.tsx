'use client';
import { useQueryState } from 'nuqs';
import React from 'react';

function OrderDetailsLayout({
  receiver,
  sender,
}: {
  receiver: React.ReactNode;
  sender: React.ReactNode;
}) {
  const [userType] = useQueryState('user_type');
  return (
    <div className='flex'>{userType === 'receiver' ? receiver : sender}</div>
  );
}

export default OrderDetailsLayout;
