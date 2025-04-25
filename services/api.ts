import { z } from 'zod';
import { httpConfig } from './api.config';
import { createAdminAccountSchema, VerifyEmailType } from '@/libs/schema';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiAuthCompanyResponse } from '@/libs/types/auth.types';

/// AUTHENTICATION API SERVICES
export const adminSignUp = async (
  data: z.infer<typeof createAdminAccountSchema>
) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiAuthCompanyResponse>
  >('/auth/company_signup/', data);
};

export const verifyEmail = async (data: VerifyEmailType) => {
  return await httpConfig.post('/auth/verify_email/', data);
};
