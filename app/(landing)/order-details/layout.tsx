'use client';
import React from 'react';

function OrderDetailsLayout({
  receiver,
  sender,
}: {
  receiver: React.ReactNode;
  sender: React.ReactNode;
}) {
  const [userType] = React.useState('sender');
  return (
    <div className='flex'>{userType === 'receiver' ? receiver : sender}</div>
  );
}

export default OrderDetailsLayout;
