/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  cashierLoginSchema,
  CashierLoginType,
  changePasswordScheme,
  ChangePasswordType,
  createAdminAccountSchema,
  createUserAccountSchema,
  type CreateUserAccountType,
  forgotPasswordSchema,
  ForgotPasswordType,
  loginSchema,
  type LoginType,
  updateUserInfoSchema,
  UpdateUserInfoType,
  uploadCompanyDetailSchema,
  UploadCompanyDetailType,
  verifyEmailSchema,
  changeForgotPasswordSchema,
  ChangeForgotPasswordType,
} from '@/libs/schema';
import { localStorageStore } from '@/libs/store';
import { showToast } from '@/libs/toast';
import { ApiUserInfoResponse } from '@/libs/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  adminSignUp,
  cashierLogin,
  changePassword,
  fetUserDetails,
  forgotPassword,
  login,
  sendVerificationCode,
  updateUserProfile,
  uploadCompanyDetail,
  userSignUp,
  verifyEmail,
  changeForgotPassword,
} from '../api';
import { user_keys } from '../queries/user.queries';
import { useState, useEffect } from 'react';

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
        localStorageStore.setItem('verify-mail', form.getValues('email'));
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
  const userEmail = localStorageStore.getItem('verify-mail') as string;

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
  const email = localStorageStore.getItem('verify-mail') as string;

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
  const queryClient = useQueryClient();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.status) {
        setCookie('access_token', data.data.access);
        setCookie('refresh_token', data.data.refresh);
        setCookie('user_type', data.data.user_type);
        setCookie('password', form.getValues('password'));
        await queryClient.prefetchQuery({
          queryKey: ['userInfo'],
          queryFn: () => fetUserDetails(),
        });

        if (data.data.user_type === 'MERCHANT') {
          router.push('/admin/gift-cards');
          return;
        }
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

export const useForgotPassword = () => {
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      localStorage.setItem('email', form.getValues('email'));
      router.push('/auth/change-forgot-password');
    },
  });

  const onSubmit = (data: ForgotPasswordType) => {
    const res = mutation.mutateAsync(data);
    showToast(res, {
      loading: 'Sending password reset link...',
      success: 'Password reset link sent successfully',
      error: 'An error occurred while sending the password reset link',
    });
  };
  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const userData: AxiosResponse<ApiUserInfoResponse> | undefined =
    queryClient.getQueryData(user_keys.userInfo());

  const form = useForm<UpdateUserInfoType>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      first_name: userData?.data.first_name || '',
      last_name: userData?.data.last_name || '',
      email: userData?.data.email || '',
      phone_number: userData?.data.phone_number || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: user_keys.userInfo(),
      });
      queryClient.setQueryData(user_keys.userInfo(), (oldData: any) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            first_name: variables.first_name,
            last_name: variables.last_name,
            email: variables.email,
            phone_number: variables.phone_number,
          },
        };
      });
    },
  });
  const onSubmit = (data: UpdateUserInfoType) => {
    const res = mutation.mutateAsync(data);
    showToast(res, {
      loading: 'Updating profile...',
      success: 'Profile updated successfully',
      error: 'An error occurred while updating the profile',
    });
  };

  return {
    form,
    onSubmit,
    userData,
  };
};

export const useCashierLogin = () => {
  const form = useForm<CashierLoginType>({
    resolver: zodResolver(cashierLoginSchema),
    defaultValues: {
      branch_id: '',
      password: '',
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: cashierLogin,
    onSuccess: (data: any) => {
      if (data.status) {
        setCookie('access_token', data.data.access);
        setCookie('refresh_token', data.data.refresh);
        setCookie('user_type', data.data.user_type);
        router.push('/cashier/gift-cards');
        return;
      }
    },
  });

  const onSubmit = (data: CashierLoginType) => {
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

export const useChangeForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const form = useForm<ChangeForgotPasswordType>({
    resolver: zodResolver(changeForgotPasswordSchema),
    defaultValues: {
      email: '',
      otp_code: '',
      password: '',
      confirm_password: '',
    },
  });

  console.log(email);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      form.setValue('email', storedEmail);
    }
  }, [form, setEmail]);

  const mutation = useMutation({
    mutationFn: changeForgotPassword,
    onSuccess: (data) => {
      if (data.status) {
        localStorage.removeItem('email');
        router.push('/auth/sign-in');
      }
    },
  });

  const onSubmit = (data: ChangeForgotPasswordType) => {
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
