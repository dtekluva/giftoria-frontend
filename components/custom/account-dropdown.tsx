import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteCookie, getCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import UserIcon from '../icon/user-icon';

export function AccountDropdown() {
  const access_token = getCookie('access_token');
  const router = useRouter();
  const handleSignOut = () => {
    deleteCookie('access_token');
    deleteCookie('password');
    deleteCookie('refresh_token');
    router.push('/auth/sign-in');
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  const handleSignUp = () => {
    router.push('/auth/sign-up');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon className='cursor-pointer' />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='min-w-64 mt-8 relative z-50'
        align='center'>
        {access_token ? (
          <>
            <DropdownMenuLabel className='text-center md:text-xl text-base font-semibold pt-3'>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-dm-sans py-3 px-10 cursor-pointer text-base'>
              My Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-dm-sans py-3 px-10 cursor-pointer text-base'>
              Orders
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-dm-sans py-3 px-10 cursor-pointer text-base'>
              My Received Gift Cards
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className='text-red-500 font-dm-sans py-3 px-10 cursor-pointer text-base'>
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className='text-center md:text-xl text-base font-semibold pt-3'>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignUp}
              className='font-dm-sans py-3 px-10 cursor-pointer text-base'>
              Sign Up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignIn}
              className='font-dm-sans py-3 px-10 cursor-pointer text-base'>
              Sign In
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
