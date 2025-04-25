import { createAdminAccountSchema } from '@/libs/schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  return { form };
}
