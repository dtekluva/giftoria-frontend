'use client';
import AuthCard from '@/components/custom/auth-card';
import UploadDocumentIcon from '@/components/icon/upload-document-icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/number-stepper';
import {
  useAdminUploadDetails,
  useCreateAdminAccount,
  useVerifyEmail,
} from '@/services/mutations/auth.mutations';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useState } from 'react';

const steps = [1, 2, 3];

function AdminSignUp() {
  const [step] = useQueryState('step', parseAsInteger);

  const [activeStep, setActiveStep] = React.useState(
    step && steps.includes(step) ? step : 1
  );
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
        {activeStep == 1 && <CreateAccount setActiveStep={setActiveStep} />}
        {activeStep == 2 && <VerifyEmail setActiveStep={setActiveStep} />}
        {activeStep == 3 && <UploadDocDetails />}
      </AuthCard>
    </div>
  );
}

function CreateAccount({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleNextStep() {
    setActiveStep((prev) => prev + 1);
  }

  const { form, onSubmit } = useCreateAdminAccount(handleNextStep);

  return (
    <Form {...form}>
      <form
        className='md:space-y-7 space-y-4'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='company_name'
          render={({ field }) => (
            <FormItem className='flex md:flex-row flex-col gap-4'>
              <div className='space-y-2 flex-1 font-dm-sans'>
                <FormLabel className='text-base font-semibold text-gray-700'>
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Please enter your first name'
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className='flex md:flex-row flex-col gap-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex md:flex-row flex-col gap-4 flex-1'>
                <div className='space-y-2 flex-1 font-dm-sans'>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                      placeholder='Please enter your email'
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem className='flex md:flex-row flex-col gap-4 flex-1'>
                <div className='space-y-2 flex-1 font-dm-sans'>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='+234 070 0000000' />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex md:flex-row flex-col gap-4'>
              <div className='space-y-2 flex-1 font-dm-sans'>
                <FormLabel className='text-base font-semibold text-gray-700'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    {...field}
                    placeholder='Please enter your password'
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          name='promote_notification'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex items-center space-x-2 -mt-2 md:-mt-4 cursor-pointer'>
              <FormControl>
                <Checkbox
                  id='logged-in'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor='logged-in' className='text-xs font-dm-sans'>
                {' '}
                Notify me of new deals and offers from your Partners
              </FormLabel>
            </FormItem>
          )}
        />

        <p className='text-xs font-dm-sans'>
          By creating an account, you agree to the Giftoria terms and
          conditions. John Lewis will process your personal data as set out in
          our privacy notice
        </p>
        <Button
          onClick={() => {
            if (form.formState.isValid) {
              // setActiveStep((prev) => prev + 1);
            }
          }}
          type='submit'
          className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4'>
          Create Account
        </Button>
        <Button
          variant={'outline'}
          className='text-xs w-full md:h-[70px] h-[50px] mb-10 -mt-1 text-black'>
          Already have an account ?
          <span className='font-semibold text-base text-primary'>Sign up</span>
        </Button>
      </form>
    </Form>
  );
}

function VerifyEmail({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const { form, onSubmit, userEmail } = useVerifyEmail(handleNextStep);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h1 className='md:text-2xl'>
            To keep your account safe we need to <br /> verify your email
            address
          </h1>
          <p className='mt-4 md:mt-7 font-dm-sans'>
            Check your email, we sent an OTP to your email
            <br /> <span className='font-bold'>{userEmail ?? ''}</span>
          </p>
          <FormField
            control={form.control}
            name='otp_code'
            render={({ field }) => (
              <FormItem className='flex md:flex-row flex-col gap-4'>
                <div className='space-y-2 flex-1 font-dm-sans'>
                  <FormLabel className='text-base font-semibold text-gray-700'>
                    Enter Code
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Please enter OTP code' />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <button className='font-dm-sans font-medium text-base md:mt-4 mt-3 text-primary'>
            Request the code again
          </button>
          <p className='md:mt-7 mt-5 font-dm-sans'>
            Remember to check your spam/junk folder. It can take several minutes
            for your email to arrive, but if you don’t see the mail after 5
            minutes
          </p>
          <p className='md:mt-5 mt-3 font-dm-sans'>
            If you do request the code to be re-sent, makes sure you enter it on
            this page as signing it again will generate a different code
          </p>
          <Button
            type='submit'
            disabled={!form.formState.isValid}
            className='text-base font-semibold md:h-[70px] h-[50px] mt-4'>
            Verify Code
          </Button>
          <Button
            variant={'outline'}
            className='text-sm font-bold md:text-base md:h-[70px] h-[50px] mb-10  mt-10 w-full'>
            Back to Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}

function UploadDocDetails() {
  const { form, onSubmit } = useAdminUploadDetails();
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(e.target.files);
    if (file) {
      form.setValue('upload_cac_document', file);
      setUploadedFileName(file.name);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='md:space-y-7 space-y-5'>
        <FormField
          control={form.control}
          name='business_type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter your business type' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='registration_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Registration Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your registration number'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex md:flex-row flex-col gap-4'>
          <FormField
            control={form.control}
            name='date_of_incorporation'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Date of Incorporation</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tin_number'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>TIN Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter your TIN number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='company_address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter your company address' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' {...field} placeholder='Enter your email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='upload_cac_document'
          render={({}) => (
            <FormItem>
              <FormLabel>Upload CAC Document</FormLabel>
              <div className='flex items-center gap-4'>
                <label
                  htmlFor='upload_cac_document'
                  className='md:px-6 px-5 flex items-center gap-4 cursor-pointer py-4 rounded-[8px] bg-secondary-transparent'>
                  <UploadDocumentIcon />
                  <p className='font-medium font-dm-sans text-[#323232] text-sm'>
                    {uploadedFileName || 'Maximum file size 10MB'}
                  </p>
                </label>
                <input
                  id='upload_cac_document'
                  type='file'
                  accept='image/jpeg,image/png,image/jpg,image/gif,image/webp'
                  className='hidden'
                  onChange={handleFileChange}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='terms_and_conditions'
          render={({ field }) => (
            <FormItem className='flex items-center space-x-2 -mt-2 md:-mt-4 cursor-pointer'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>I accept the terms and conditions</FormLabel>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='text-base w-full font-semibold md:h-[70px] h-[50px] mt-4 mb-5'>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AdminSignUp;
