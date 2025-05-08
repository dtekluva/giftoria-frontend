import { branchDetailsSchema, companyDetailsSchema } from '@/libs/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { company_keys } from '../queries/company.queries';
import { AxiosResponse } from 'axios';
import { ApiCompanyDetailsResponse } from '@/libs/types/brand.types';

export const useUpdateCompanyDetails = () => {
  const queryClient = useQueryClient();
  const company_dashboard:
    | AxiosResponse<ApiCompanyDetailsResponse>
    | undefined = queryClient.getQueryData(company_keys.company_dashboard());

  console.log('Company dashboard data:', company_dashboard?.data);

  const form = useForm<z.infer<typeof companyDetailsSchema>>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      company_name: company_dashboard?.data?.company_name || '',
      company_email: company_dashboard?.data?.company_address || '',
      phone_number: company_dashboard?.data?.registration_number || '',
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

export const useBranchDetailsForm = () => {
  const form = useForm<z.infer<typeof branchDetailsSchema>>({
    resolver: zodResolver(branchDetailsSchema),
    defaultValues: {
      branch_name: '',
      branch_address: '',
      branch_id: '',
      branch_password: '',
      is_active: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof branchDetailsSchema>) => {
    console.log('Branch form submitted:', data);
    // Add API call logic here
  };

  return {
    form,
    onSubmit,
  };
};
