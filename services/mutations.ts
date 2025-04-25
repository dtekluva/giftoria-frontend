'use client';
import { createAdminAccountSchema, verifyEmailSchema } from '@/libs/schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  adminSignUp,
  verifyEmail,
  userSignUp,
  sendVerificationCode,
  login,
} from './api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useRouter } from 'next/navigation';
import {
  createUserAccountSchema,
  type CreateUserAccountType,
  loginSchema,
  type LoginType,
} from '@/libs/schema';
import { setCookie } from 'cookies-next/client';

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

export const useCreateUserAccount = () => {
  const router = useRouter();
  const [, setEmail] = useQueryState('email');

  const form = useForm<CreateUserAccountType>({
    resolver: zodResolver(createUserAccountSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
      promotion_notification: false,
    },
  });

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      if (data.status) {
        setEmail(form.getValues('email'));
        router.push('/auth/email-verify');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  const onSubmit = (data: CreateUserAccountType) => {
    const res = mutation.mutateAsync(data);

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
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useSendVerificationCode = () => {
  const [email] = useQueryState('email');

  const mutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      toast.success('Verification code sent successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to send verification code'
      );
    },
  });

  const resendCode = () => {
    if (!email) {
      toast.error('Email not found');
      return;
    }

    const res = mutation.mutateAsync({ email });

    toast.promise(res, {
      loading: 'Sending verification code...',
      success: 'Verification code sent successfully',
      error: (error) => {
        if (error.response) {
          const errorKey = Object.keys(error.response.data)[1];
          const errorMessage = error.response.data[errorKey];
          return errorMessage;
        }
        return 'Failed to send verification code';
      },
    });
  };

  return {
    resendCode,
    isLoading: mutation.isPending,
  };
};

export const useLogin = () => {
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status) {
        toast.success('Login successful');
        setCookie('token', data.data.token);
        router.push('/');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = (data: LoginType) => {
    const res = mutation.mutateAsync(data);

    toast.promise(res, {
      loading: 'Logging in...',
      success: (data) => {
        if (data.status) {
          return 'Login successful';
        } else {
          return 'Login failed';
        }
      },
      error: (error) => {
        if (error.response) {
          const errorKey = Object.keys(error.response.data)[1];
          const errorMessage = error.response.data[errorKey];
          return errorMessage;
        }
        return 'Login failed';
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
