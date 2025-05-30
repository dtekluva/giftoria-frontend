import Clipboard from '@/components/custom/clipboard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBankTransferCompeleted } from '@/services/queries/brand.queries';
import { useState } from 'react';

interface BankTransferDetails {
  bank_name: string;
  account_name: string;
  account_number: string;
  request_reference: string;
}

interface BankTransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: BankTransferDetails | null;
  payingThroughBank: boolean;
  amount?: number;
}

export function BankTransferModal({
  open,
  onOpenChange,
  details,
  payingThroughBank,
  amount = 0,
}: BankTransferModalProps) {
  const [confirmTransfer, setConfirmTransfer] = useState(false);

  const { query } = useBankTransferCompeleted(
    confirmTransfer && open,
    details?.request_reference as string
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='font-dm-sans'>
        <DialogHeader>
          <DialogTitle className='text-base'>Bank Transfer Details</DialogTitle>
        </DialogHeader>
        <div className='py-4 text-center'>
          {payingThroughBank ? (
            // Skeleton loader
            <div className='space-y-4'>
              <div className='h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
            </div>
          ) : details ? (
            <div className='py-4 text-center'>
              <div className='space-y-3'>
                <p className='text-sm font-semibold mb-2'>
                  Please transfer to the account below:
                </p>
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-medium text-xs text-left'>
                    Bank Name:
                  </span>
                  <span className='font-bold text-sm text-right'>
                    {details.bank_name}
                  </span>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-medium text-xs text-left'>
                    Account Name:
                  </span>
                  <span className='font-bold text-sm text-right'>
                    {details.account_name}
                  </span>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-medium text-xs text-left'>
                    Account Number:
                  </span>
                  <Clipboard title='' value={details.account_number} />
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-medium text-xs text-left'>Amount:</span>
                  <span className='font-bold text-sm text-right'>
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
                <div className='flex items-center justify-between gap-4'>
                  <span className='font-medium text-xs text-left'>
                    Reference:
                  </span>
                  <span className='font-bold text-sm text-right'>
                    {details.request_reference}
                  </span>
                </div>
                <div className='modal-footer flex justify-end mt-4'>
                  <Button
                    type='button'
                    className='text-[#990099] underline font-semibold hover:text-[#7a007a] transition bg-transparent border-0 p-0 shadow-none cursor-pointer'
                    disabled={query.isLoading}
                    onClick={() => {
                      console.log('Transfer confirmed');
                      setConfirmTransfer(true);
                    }}>
                    {query.isLoading ? (
                      <span className='flex items-center gap-2'>
                        <svg
                          className='animate-spin h-4 w-4 text-[#990099]'
                          viewBox='0 0 24 24'>
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                            fill='none'
                          />
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8v8z'
                          />
                        </svg>
                        Processing your transfer...
                      </span>
                    ) : (
                      'I have made the transfer'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className='text-red-500'>Unable to fetch bank details.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
