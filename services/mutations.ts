import { createAdminAccountSchema } from '@/libs/schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { adminSignUp } from './api';
import { toast } from 'sonner';

export function useCreateAdminAccount() {
  const form = useForm<z.infer<typeof createAdminAccountSchema>>({
    resolver: zodResolver(createAdminAccountSchema),
    defaultValues: {
      company_name: '',
      email: '',
      phone_number: '',
      password: '',
      promote_notification: false,
    },
  });

  async function onSubmit(data: z.infer<typeof createAdminAccountSchema>) {
    console.log('Form data:', data, process.env.NEXT_PUBLIC_BASE_API_URL);
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
  });

  return {
    form,
    mutation,
    onSubmit,
  };
}
