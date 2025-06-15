import { MY_ORDER_PAGE_SIZE } from '@/libs/constants';
import { branchDetailsSchema, companyDetailsSchema } from '@/libs/schema';
import { showToast } from '@/libs/toast';
import { ApiCompanyDetailsResponse } from '@/libs/types/brand.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createBranch, deleteBranch, uploadCompanyLogo } from '../api';
import { company_keys } from '../queries/company.queries';
import { toast } from 'sonner';

export const useUpdateCompanyDetails = () => {
  const queryClient = useQueryClient();
  const company_dashboard:
    | AxiosResponse<ApiCompanyDetailsResponse>
    | undefined = queryClient.getQueryData(company_keys.company_dashboard());

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

export const useBranchDetailsForm = (currentPage: number) => {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: createBranch,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: company_keys.company_branches(
          '',
          currentPage,
          MY_ORDER_PAGE_SIZE
        ),
      });
      console.log('Branch created:', data);
      form.reset();
    },
  });

  const onSubmit = (data: z.infer<typeof branchDetailsSchema>) => {
    const res = mutation.mutateAsync(data);

    showToast(res, {
      success: 'Branch created successfully',
      error: 'Error creating branch',
      loading: 'Creating branch...',
    });
  };

  return {
    form,
    onSubmit,
    mutation,
  };
};

export const useDeleteBranch = (currentPage: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: company_keys.company_branches(
          '',
          currentPage,
          MY_ORDER_PAGE_SIZE
        ),
      });
    },
  });

  const deleteBranchMutate = async (id: string) => {
    const res = mutation.mutateAsync(id);

    showToast(res, {
      success: 'Branch deleted successfully',
      error: 'Error deleting branch',
      loading: 'Deleting branch...',
    });
  };

  return {
    deleteBranchMutate,
  };
};

export const useUploadCompanyLogoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const file = formData.get('upload_company_logo') as File;
      if (!file) return;
      try {
        const response = await uploadCompanyLogo(formData);

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Company logo updated successfully');
      queryClient.invalidateQueries({ queryKey: company_keys.company_logo() });
    },
    onError: (error) => {
      console.error('Mutation: Error callback', error);
      toast.error('Failed to update company logo');
    },
  });
};
