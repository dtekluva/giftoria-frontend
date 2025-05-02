import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserIcon from '../icon/user-icon';

export function AccountDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon className='cursor-pointer' />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='min-w-64 mt-3 relative z-50'
        align='center'>
        <DropdownMenuLabel className='text-center md:text-xl text-base font-semibold pt-3'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='font-dm-sans py-3 px-10 text-base'>
          My Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='font-dm-sans py-3 px-10 text-base'>
          Orders
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='font-dm-sans py-3 px-10 text-base'>
          My Received Gift Cards
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500 font-dm-sans py-3 px-10 text-base'>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
