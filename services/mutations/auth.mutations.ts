/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  changePasswordScheme,
  ChangePasswordType,
  createAdminAccountSchema,
  createUserAccountSchema,
  type CreateUserAccountType,
  loginSchema,
  type LoginType,
  uploadCompanyDetailSchema,
  UploadCompanyDetailType,
  verifyEmailSchema,
} from '@/libs/schema';
import { localStorageStore } from '@/libs/store';
import { showToast } from '@/libs/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  adminSignUp,
  changePassword,
  login,
  sendVerificationCode,
  uploadCompanyDetail,
  userSignUp,
  verifyEmail,
} from '../api';

type ApiAuthCompanyResponse = z.infer<typeof createAdminAccountSchema>;

export function useCreateAdminAccount(fn?: () => void) {
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
        localStorage.setItem('verify-mail', form.getValues('email'));
        fn?.();
      }
    },
  });

  return {
    form,
    mutation,
    onSubmit,
  };
}

export const useAdminUploadDetails = () => {
  const router = useRouter();
  const form = useForm<UploadCompanyDetailType>({
    resolver: zodResolver(uploadCompanyDetailSchema),
    defaultValues: {
      business_type: '',
      registration_number: '',
      date_of_incorporation: '',
      tin_number: '',
      company_address: '',
      email: '',
      upload_cac_document: null,
      terms_and_conditions: false,
    },
  });

  const mutation = useMutation({
    mutationFn: uploadCompanyDetail,
    mutationKey: ['auth', 'company_upload_document'],
    onSuccess: () => {
      router.push('/auth/sign-in');
    },
  });

  async function onSubmit(data: UploadCompanyDetailType) {
    try {
      const formData = new FormData();
      formData.append('business_type', data.business_type);
      formData.append('registration_number', data.registration_number);
      formData.append('date_of_incorporation', data.date_of_incorporation);
      formData.append('tin_number', data.tin_number);
      formData.append('company_address', data.company_address);
      formData.append('email', data.email);

      // Append the file if it exists
      if (data.upload_cac_document) {
        formData.append(
          'upload_cac_document',
          data.upload_cac_document as File
        );
      }

      formData.append(
        'terms_and_conditions',
        data.terms_and_conditions.toString()
      );

      const res = mutation.mutateAsync(formData as any);
      showToast(res, {
        loading: 'Uploading company details...',
        success: 'Company details uploaded successfully',
        error: 'Something went wrong',
      });
    } catch (error) {
      console.error('Error uploading company details:', error);
    }
  }

  return {
    form,
    onSubmit,
  };
};

export const useVerifyEmail = (fn?: () => void) => {
  const userEmail = localStorage.getItem('verify-mail') as string;

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
      fn?.();
    },
  });

  return {
    form,
    mutation,
    onSubmit,

    userEmail,
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
    onError(error, variables) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data.detail.includes('verify')) {
          localStorageStore.setItem('verify-mail', variables.email);
          router.push('/auth/email-verify');
        }
        if (
          error?.response?.data.detail.includes('company details not verified')
        ) {
          router.push('/auth/admin/sign-up?step=3');
        }
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
