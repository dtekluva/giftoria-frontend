'use client';
import CopyIcon from '@/components/icon/copy-icon';
import { toast } from 'sonner';

interface ClipboardProps {
  title: string;
  value: string;
}

export default function Clipboard({ title, value }: ClipboardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      toast(`${title} copied 🎉`);
    });
  };

  return (
    <div className='flex items-center gap-4 justify-between'>
      <p className='text-xs font-montserrat'>{title}</p>
      <div className='flex items-center gap-1'>
        <p className='text-[10px] md:text-sm font-bold font-dm-sans text-[#556575]'>
          {value}
        </p>
        <button
          type='button'
          onClick={handleCopy}
          aria-label={`Copy ${title}`}
          className='cursor-pointer'>
          <CopyIcon />
        </button>
      </div>
    </div>
  );
}
