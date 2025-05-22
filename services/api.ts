import { z } from 'zod';
import { httpConfig } from './api.config';
import {
  createAdminAccountSchema,
  CreateUserAccountType,
  VerifyEmailType,
  SendVerificationCodeType,
  LoginType,
  ChangePasswordType,
  UploadCompanyDetailType,
  BranchDetailsType,
  UpdateUserInfoType,
  CashierLoginType,
} from '@/libs/schema';
import { AxiosError, AxiosResponse } from 'axios';
import {
  ApiAuthCompanyResponse,
  ApiUserInfoResponse,
} from '@/libs/types/auth.types';
import {
  ApiAllBrandCardsResponse,
  ApiBranchResponse,
  ApiBuyCardResponse,
  ApiCardSalesResponse,
  ApiCompanyDetailsResponse,
  ApiPaymentSetupResponse,
  BuyMultipleCard,
  CardSale,
  IBuyCardAgain,
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

export const updateUserProfile = async (data: UpdateUserInfoType) => {
  return await httpConfig.put<
    AxiosError,
    AxiosResponse<ApiAuthCompanyResponse>
  >('/auth/update_user_profile/', data);
};

export const changePassword = (data: ChangePasswordType) =>
  httpConfig.put('/auth/change_password/', data);

export const uploadCompanyDetail = async (data: UploadCompanyDetailType) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiAuthCompanyResponse>
  >('/auth/company_upload_document/', data);
};

export const fetUserDetails = async () => {
  return await httpConfig.get<AxiosError, AxiosResponse<ApiUserInfoResponse>>(
    '/auth/user_profile/'
  );
};

export const cashierLogin = async (data: CashierLoginType) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiAuthCompanyResponse>
  >('/auth/cashier_login/', data);
};

/// Brand API SERVICES
export const getAllBrandCards = async ({
  search = '',
  showAllCards = false,
}: {
  search?: string;
  showAllCards?: boolean;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiAllBrandCardsResponse>
  >(
    `/brand/all_cards/?${
      showAllCards ? '' : 'page_size=8&page=1'
    }&search=${search}`
  );
};

export const searchAllBrands = async ({ search }: { search: string }) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiAllBrandCardsResponse>
  >(`/brand/all_cards/?search=${search}`);
};

export const getBrandCardById = async (id: string) => {
  return await httpConfig.get<AxiosError, AxiosResponse<ICard>>(
    `/brand/fetch_single_brand/?brand_id=${id}`
  );
};

export const getAllCardSales = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<AxiosError, AxiosResponse<ApiCardSalesResponse>>(
    `/brand/fetch_card_sales/?search=${search}&page=${page}&page_size=${page_size}`
  );
};

export const getCardSalesById = async (id: string) => {
  return await httpConfig.get<AxiosError, AxiosResponse<CardSale>>(
    `/brand/fetch_single_card_sale/?sale_id=${id}`
  );
};

export const buyCardbyId = async (data: BuyMultipleCard) => {
  return await httpConfig.post<AxiosError, AxiosResponse<ApiBuyCardResponse>>(
    `/brand/buy_card/`,
    data
  );
};

export const buyCardAgainbyId = async (data: IBuyCardAgain) => {
  return await httpConfig.post<AxiosError, AxiosResponse<ApiBuyCardResponse>>(
    `/brand/buy_card_again/`,
    data
  );
};

// COMPANY API SERVICES
export const getCompanyDashboard = async () => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiCompanyDetailsResponse>
  >('/auth/company_dashboard/');
};

export const createBranch = async (data: BranchDetailsType) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiCompanyDetailsResponse>
  >('/branch/create_branch/', data);
};

export const deleteBranch = async (id: string) => {
  return await httpConfig.delete<
    AxiosError,
    AxiosResponse<ApiCompanyDetailsResponse>
  >(`/branch/delete_branches/?branch_id=${id}`);
};

export const fetchBranches = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<AxiosError, AxiosResponse<ApiBranchResponse>>(
    `/branch/fetch_branches/?search=${search}&page=${page}&page_size=${page_size}`
  );
};

export const fetchCompanyOrderHistory = async () => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiCompanyDetailsResponse>
  >('/branch/company_branch_order_history/');
};

export const payViaPayStack = async (reference: string) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiPaymentSetupResponse>
  >(`/brand/pay_via_paystack/?reference=${reference}`);
};

export const payViaBank = async (reference: string) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiPaymentSetupResponse>
  >(`/brand/pay_via_bank_transfer/?reference=${reference}`);
};

export const bankTransferCompeleted = async (reference: string) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiPaymentSetupResponse>
  >(`/wema/bank_transfer_completed/?reference=${reference}`);
};
