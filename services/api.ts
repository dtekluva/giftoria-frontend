import { z } from 'zod';
import { httpConfig } from './api.config';
import {
  createAdminAccountSchema,
  CreateUserAccountType,
  VerifyEmailType,
  SendVerificationCodeType,
  LoginType,
  ChangePasswordType,
} from '@/libs/schema';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiAuthCompanyResponse } from '@/libs/types/auth.types';
import {
  ApiAllBrandCardsResponse,
  BuyMultipleCard,
  ICard,
} from '@/libs/types/brand.types';

/// AUTHENTICATION API SERVICES
export const adminSignUp = async (
  data: z.infer<typeof createAdminAccountSchema>
) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiAuthCompanyResponse>
  >('/auth/company_signup/', data);
};

export const userSignUp = async (data: CreateUserAccountType) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiAuthCompanyResponse>
  >('/auth/signup/', data);
};
export const verifyEmail = async (data: VerifyEmailType) => {
  return await httpConfig.post('/auth/verify_email/', data);
};

export const sendVerificationCode = async (data: SendVerificationCodeType) => {
  return await httpConfig.post('/auth/send_verification_code/', data);
};

export const login = async (data: LoginType) => {
  return await httpConfig.post('/auth/signin/', data);
};

export const changePassword = (data: ChangePasswordType) =>
  httpConfig.put('/auth/change_password/', data);

/// Brand API SERVICES
export const getAllBrandCards = async () => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiAllBrandCardsResponse>
  >('/brand/all_cards');
};

export const getBrandCardById = async (id: string) => {
  return await httpConfig.get<AxiosError, AxiosResponse<ICard>>(
    `/brand/fetch_single_brand/?brand_id=${id}`
  );
};

export const buyCardbyId = async (data: BuyMultipleCard) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiAllBrandCardsResponse>
  >(`/brand/buy_card`, data);
};
