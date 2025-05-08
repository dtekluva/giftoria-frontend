import { companyDetailsSchema } from '@/libs/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useUpdateCompanyDetails = () => {
  const form = useForm<z.infer<typeof companyDetailsSchema>>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      company_name: '',
      company_email: '',
      phone_number: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof companyDetailsSchema>) => {
    console.log('Form submitted:', data);
  };

  return {
    form,
    onSubmit,
  };
};
