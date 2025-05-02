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

      <DropdownMenuContent className='w-64 mt-3 relative z-50' align='center'>
        <DropdownMenuLabel className='text-center text-base font-semibold'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My Profile</DropdownMenuItem>
        <DropdownMenuItem>Orders</DropdownMenuItem>
        <DropdownMenuItem>My Received Gift Cards</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500'>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
