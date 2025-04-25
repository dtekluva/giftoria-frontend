import { createAdminAccountSchema, verifyEmailSchema } from '@/libs/schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { adminSignUp, verifyEmail } from './api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { parseAsBoolean, useQueryState } from 'nuqs';

type ApiAuthCompanyResponse = z.infer<typeof createAdminAccountSchema>;

export function useCreateAdminAccount() {
  const [accountCreated, setAccountCreated] = useQueryState(
    'account_created',
    parseAsBoolean
  );

  const [userEmail, setEmail] = useQueryState('email');
  const [emailVerified] = useQueryState('email_verified', parseAsBoolean);

  const form = useForm<ApiAuthCompanyResponse>({
    resolver: zodResolver(createAdminAccountSchema),
    defaultValues: {
      company_name: '',
      email: '',
      phone_number: '',
      password: '',
      promote_notification: false,
    },
  });

  async function onSubmit(data: ApiAuthCompanyResponse) {
    const res = mutation.mutateAsync(data);
    console.log('Response:', res);
    toast.promise(res, {
      loading: 'Creating account...',
      success: (data) => {
        if (data.status) {
          return 'Account created successfully';
        } else {
          return 'Account creation failed';
        }
      },
      error: (error) => {
        if (error.response) {
          const errorKey = Object.keys(error.response.data)[1];
          const errorMessage = error.response.data[errorKey];
          return errorMessage;
        } else {
          return 'An error occurred';
        }
      },
    });
  }

  const mutation = useMutation({
    mutationFn: adminSignUp,
    mutationKey: ['auth', 'company_signup'],
    onError: (error: AxiosError<Partial<ApiAuthCompanyResponse>>) => {
      if (error.response) {
        const errorKey = Object.keys(
          error.response.data
        )[1] as keyof ApiAuthCompanyResponse;
        form.setError(errorKey, {
          message: (error?.response?.data?.[errorKey]
            ? error?.response?.data?.[errorKey]
            : 'An error occurred') as string,
        });
      }
    },
    onSuccess: (data) => {
      if (data.status) {
        // setEmail(data.data.email);
        console.log('Email:', form.getValues('email'));
        setEmail(form.getValues('email'));
        setAccountCreated(true);
      }
    },
  });

  return {
    form,
    mutation,
    onSubmit,
    setAccountCreated,
    setEmail,
    accountCreated,
    userEmail,
    emailVerified,
  };
}

export const useVerifyEmail = () => {
  const [, setAccountCreated] = useQueryState(
    'account_created',
    parseAsBoolean
  );

  const [userEmail, setEmail] = useQueryState('email');
  const [emailVerified, setEmailVerified] = useQueryState(
    'email_verified',
    parseAsBoolean
  );

  const form = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: userEmail ?? '',
    },
  });

  async function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    const res = mutation.mutateAsync(data);
    toast.promise(res, {
      loading: 'Verifying email...',
      success: (data) => {
        if (data.status) {
          return 'Email verified successfully';
        } else {
          return 'Email verification failed';
        }
      },
      error: (error) => {
        if (error.response) {
          const errorKey = Object.keys(error.response.data)[1];
          const errorMessage = error.response.data[errorKey];
          return errorMessage;
        }
      },
    });
  }

  const mutation = useMutation({
    mutationFn: verifyEmail,
    mutationKey: ['auth', 'verify_email'],
    onSuccess: () => {
      setEmailVerified(true);
    },
  });

  return {
    form,
    mutation,
    onSubmit,
    setAccountCreated,
    setEmail,
    userEmail,
    setEmailVerified,
    emailVerified,
  };
};
