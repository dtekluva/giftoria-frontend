'use client';
import {
  changePasswordScheme,
  ChangePasswordType,
  createAdminAccountSchema,
  createUserAccountSchema,
  type CreateUserAccountType,
  loginSchema,
  type LoginType,
  verifyEmailSchema,
} from '@/libs/schema';
import { localStorageStore } from '@/libs/store';
import { showToast } from '@/libs/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  adminSignUp,
  changePassword,
  login,
  sendVerificationCode,
  userSignUp,
  verifyEmail,
} from '../api';

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

  const userEmail = localStorage.getItem('verify-mail') as string;
  const [emailVerified, setEmailVerified] = useQueryState(
    'email_verified',
    parseAsBoolean
  );

  const form = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: userEmail ?? '',
      otp_code: '',
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

    userEmail,
    setEmailVerified,
    emailVerified,
  };
};

export const useCreateUserAccount = () => {
  const router = useRouter();

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
        localStorageStore.setItem('verify-mail', form.getValues('email'));
        router.push('/auth/email-verify/');
      }
    },
  });

  const onSubmit = (data: CreateUserAccountType) => {
    const res = mutation.mutateAsync(data);

    showToast(res, {
      loading: 'Creating account...',
      success: 'Account created successfully',
      error: 'Something went wrong',
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useSendVerificationCode = () => {
  const email = localStorage.getItem('verify-mail') as string;

  const mutation = useMutation({
    mutationFn: sendVerificationCode,
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
        setCookie('access_token', data.data.access);
        setCookie('refresh_token', data.data.refresh);
        setCookie('password', form.getValues('password'));
        router.push('/');
      }
    },
  });

  const onSubmit = (data: LoginType) => {
    const res = mutation.mutateAsync(data);

    showToast(res, {
      loading: 'Logging in...',
      success: 'Login successful',
      error: 'Something went wrong',
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useChangePassword = () => {
  const router = useRouter();
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordScheme),
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.status) {
        router.push('/');
      }
    },
  });
  const onSubmit = (data: ChangePasswordType) => {
    const res = mutation.mutateAsync(data);
    showToast(res, {
      loading: 'Changing password...',
      success: 'Password changed successfully',
      error: 'An error occurred while changing the password',
    });
  };
  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
