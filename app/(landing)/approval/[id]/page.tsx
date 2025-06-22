'use client';
import ApprovalHeroIcon from '@/components/icon/approval-hero-icon';
import { useBuyerApprovalQuery } from '@/services/queries/brand.queries';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

function ApprovalPage() {
  const cardId = usePathname()?.split('/').pop();
  const { query } = useBuyerApprovalQuery(cardId ?? '');

  if (query.error) {
    toast.error('An error occured');
  }

  if (query.isSuccess) {
    toast.success('Transaction approved sucessfully');
  }

  return (
    <div className='flex flex-col items-center mt-8'>
      <ApprovalHeroIcon />
      <h1 className='text-2xl md:text-[34px] text-[#990099] font-semibold -mt-16'>
        Success
      </h1>
    </div>
  );
}

export default ApprovalPage;
