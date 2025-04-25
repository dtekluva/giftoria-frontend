'use client';
import AuthCard from '@/components/custom/auth-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Stepper,
  StepperTrigger,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
} from '@/components/ui/number-stepper';
import React from 'react';

const steps = [1, 2, 3];

function AdminSignUp() {
  const [activeStep, setActiveStep] = React.useState(1);
  return (
    <div className='w-full'>
      <AuthCard showPadding={false} title='Create Account'>
        <Stepper value={activeStep} orientation='horizontal'>
          {steps.map((step) => (
            <StepperItem
              key={step}
              step={step}
              className='[&:not(:last-child)]:flex-1'>
              <StepperTrigger className='flex-col gap-0'>
                <StepperIndicator className='mt-7' />
                <p className='font-dm-sans md:text-lg text-base text-[#BCBCBC]'>
                  Step 1
                </p>
              </StepperTrigger>
              {step < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
        {activeStep == 1 && (
          <>
            <div className='flex md:flex-row flex-col gap-4'>
              <div className='space-y-2 flex-1 font-dm-sans'>
                <Label
                  htmlFor='company_name'
                  className='text-base font-semibold text-gray-700'>
                  Company Name
                </Label>
                <Input
                  id='company_name'
                  placeholder='Please enter your first name'
                />
              </div>
            </div>
            <div className='flex md:flex-row flex-col gap-4'>
              <div className='space-y-2 flex-1 font-dm-sans'>
                <Label
                  htmlFor='email'
                  className='text-base font-semibold text-gray-700'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='email'
                  placeholder='Please enter your email'
                />
              </div>
              <div className='space-y-2 flex-1 font-dm-sans'>
                <Label htmlFor='phone' className='text-base font-semibold'>
                  Phone Number
                </Label>
                <Input id='phone' placeholder='+234 070 0000000' />
              </div>
            </div>
            <div className='space-y-2 font-dm-sans'>
              <Label htmlFor='email' className='text-base font-semibold'>
                Password
              </Label>
              <Input
                type='email'
                id='email'
                isPassword
                placeholder='Please enter your password'
              />
            </div>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex items-center space-x-2 -mt-2 md:-mt-4 cursor-pointer'>
                <Checkbox id='logged-in' />
                <label htmlFor='logged-in' className='text-xs font-dm-sans'>
                  Notify me of new deals and offers from your Partners
                </label>
              </div>
            </div>
            <p className='text-xs font-dm-sans'>
              By creating an account, you agree to the Giftoria terms and
              conditions. John Lewis will process your personal data as set out
              in our privacy notice
            </p>
            <Button
              onClick={() => {
                setActiveStep((prev) => prev + 1);
              }}
              className='text-base font-semibold md:h-[70px] h-[50px] mt-4'>
              Create Account
            </Button>
            <Button
              variant={'outline'}
              className='text-xs md:h-[70px] h-[50px] mb-10 -mt-1 text-black'>
              Already have an account ?
              <span className='font-semibold text-base text-primary'>
                Sign up
              </span>
            </Button>
          </>
        )}
        {activeStep == 2 && (
          <div>
            <h1 className='md:text-2xl'>
              To keep your account safe we need to <br /> verify your email
              address
            </h1>
            <p className='mt-4 md:mt-7 font-dm-sans'>
              Check your email, we sent an OTP to your email
              <br /> <span className='font-bold'>attahetta@gmail.com</span>
            </p>
            <div className='space-y-2 flex-1 md:mt-7 mt-4 font-dm-sans'>
              <Label
                htmlFor='code'
                className='text-base font-semibold text-gray-700'>
                Enter Code
              </Label>
              <Input id='code' placeholder='Please enter OTP code' />
            </div>
            <button className='font-dm-sans font-medium text-base md:mt-4 mt-3 text-primary'>
              Request the code again
            </button>
            <p className='md:mt-7 mt-5 font-dm-sans'>
              Remember to check your spam/junk folder. It can take several
              minutes for your email to arrive, but if you don’t see the mail
              after 5 minutes
            </p>
            <p className='md:mt-5 mt-3 font-dm-sans'>
              If you do request the code to be re-sent, makes sure you enter it
              on this page as signing it again will generate a different code
            </p>
            <Button
              onClick={() => {
                setActiveStep((prev) => prev + 1);
              }}
              className='text-base font-semibold md:h-[70px] h-[50px] mt-4'>
              Verify Code
            </Button>
            <Button
              variant={'outline'}
              className='text-sm font-bold md:text-base md:h-[70px] h-[50px] mb-10  mt-10 w-full'>
              Back to Create Account
            </Button>
          </div>
        )}
        {activeStep == 3 && (
          <div>
            <h1 className='md:text-2xl'>
              To keep your account safe we need to <br /> verify your email
              address
            </h1>
          </div>
        )}
      </AuthCard>
    </div>
  );
}

export default AdminSignUp;
