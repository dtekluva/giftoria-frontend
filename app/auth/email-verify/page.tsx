import AuthCard from '@/components/custom/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SignIn() {
  return (
    <div className='w-full'>
      <AuthCard title='Email Verification'>
        <h2 className='md:text-[24px] md:-mt-5 max-w-[468px] text-base'>
          To keep your account safe we need to verify your email address
        </h2>
        <p className='text-base font-light'>
          Check your email, we sent an OTP to your email{' '}
          <span className='font-bold'>attahetta@gmail.com</span>
        </p>
        <div className='space-y-2 md:mt-2 font-dm-sans'>
          <Label htmlFor='enter_code' className='text-base font-semibold'>
            Enter Code
          </Label>
          <Input id='enter_code' placeholder='Please enter OTP code' />
        </div>

        <button className='text-[#990099] text-left text-xs font-semibold'>
          Request the code again
        </button>
        <p className='text-base'>
          Remember to check your spam/junk folder. It can take several minutes
          for your email to arrive, but if you don’t see the mail after 5
          minutes,
          <span className='block font-light'> Request the code again</span>
        </p>
        <p className='md:-mt-2'>
          If you do request the code to be re-sent, makes sure you enter it on
          this page as signing it again will generate a different code
        </p>
        <Button
          variant={'outline'}
          className='text-base font-semibold md:h-[70px] mt-2 h-[50px]'>
          Back to Create Account
        </Button>
      </AuthCard>
    </div>
  );
}

export default SignIn;
