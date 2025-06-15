import {
  BranchDetailsType,
  CardBalanceType,
  CashierLoginType,
  ChangeForgotPasswordType,
  ChangePasswordType,
  CompanyPayOutType,
  createAdminAccountSchema,
  CreateUserAccountType,
  ForgotPasswordType,
  LoginType,
  SendVerificationCodeType,
  UpdateUserInfoType,
  UploadCompanyDetailType,
  VerifyEmailType,
} from '@/libs/schema';
import {
  ApiAuthCompanyResponse,
  ApiUserInfoResponse,
} from '@/libs/types/auth.types';
import {
  ApiAllBrandCardsResponse,
  ApiBranchResponse,
  ApiBrandCardTransactionResponse,
  ApiBrandProductResponse,
  ApiBuyCardAgainResponse,
  ApiBuyCardResponse,
  ApiCardSalesResponse,
  ApiCategoryResponse,
  ApiCompanyDetailsResponse,
  ApiCompanyPayOutTransactionResponse,
  ApiPaymentSetupResponse,
  AssignedCard,
  BuyMultipleCard,
  CardSale,
  IBuyCardAgain,
  ICard,
} from '@/libs/types/brand.types';
import { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';
import { httpConfig } from './api.config';

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

export const forgotPassword = async (data: ForgotPasswordType) => {
  return await httpConfig.post('/auth/forgot_password/', data);
};

export const changeForgotPassword = async (data: ChangeForgotPasswordType) => {
  return await httpConfig.post('/auth/change_forgot_password/', data);
};

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
  category = '',
}: {
  search?: string;
  showAllCards?: boolean;
  category?: string;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiAllBrandCardsResponse>
  >(
    `/brand/all_cards/?${showAllCards ? '' : 'page_size=8&page=1'}${
      category ? `&category__category_name=${category}` : ''
    }${search ? `&search=${search}` : ''}`
  );
};

export const fetchCategories = async () => {
  return await httpConfig.get<AxiosError, AxiosResponse<ApiCategoryResponse>>(
    '/brand/fetch_category/'
  );
};

export const searchAllBrands = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiAllBrandCardsResponse>
  >(`/brand/all_cards/?search=${search}&page=${page}&page_size=${page_size}`);
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
export const getReceivedCardSales = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<AxiosError, AxiosResponse<ApiCardSalesResponse>>(
    `/brand/fetch_assigned_cards/?search=${search}&page=${page}&page_size=${page_size}`
  );
};

export const getCardSalesById = async (id: string) => {
  return await httpConfig.get<AxiosError, AxiosResponse<CardSale>>(
    `/brand/fetch_single_card_sale/?sale_id=${id}`
  );
};
export const getCardAssignedById = async (id: string) => {
  return await httpConfig.get<AxiosError, AxiosResponse<AssignedCard>>(
    `/brand/fetch_single_assigned_cards/?card_id=${id}`
  );
};

export const buyCardbyId = async (data: BuyMultipleCard) => {
  return await httpConfig.post<AxiosError, AxiosResponse<ApiBuyCardResponse>>(
    `/brand/buy_card/`,
    data
  );
};

export const buyCardAgainbyId = async (data: IBuyCardAgain) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiBuyCardAgainResponse>
  >(`/brand/buy_card_again/`, data);
};

export const redeemedGiftCard = async (data: CardBalanceType) => {
  return await httpConfig.post<AxiosError, AxiosResponse<ApiBuyCardResponse>>(
    `/branch/branch_redeem/`,
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

export const fetchCompanyOrderHistory = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiBrandCardTransactionResponse>
  >(
    `/branch/company_order_history/?search=${search}&page=${page}&page_size=${page_size}`
  );
};
export const fetchCompanyBranchOrderHistory = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiBrandCardTransactionResponse>
  >(
    `/branch/company_branch_order_history/?search=${search}&page=${page}&page_size=${page_size}`
  );
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

// Add interface for company payout response
interface ApiCompanyPayOutResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    bank_name: string;
    account_number: string;
    account_name: string;
  };
}

export const companyPayOut = async (data: CompanyPayOutType) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiCompanyPayOutResponse>
  >('/wema/company_pay_out/', data);
};

// Add interface for AI message response
interface ApiAIMessageResponse {
  message: string;
}

// Update the getAIMessage function
export const getAIMessage = async (data: { message: string }) => {
  return await httpConfig.post<AxiosError, AxiosResponse<ApiAIMessageResponse>>(
    '/brand/get_ai_message/',
    data
  );
};

// Add interface for card redemption response
interface ApiCardRedemptionResponse {
  id: string;
  company: null;
  sender: string;
  receiver_email: string;
  brand: string;
  card_number: string;
  amount: number;
  balance: number;
  expiry_date: null | string;
  date_claimed: null | string;
  date_redeemed: null | string;
  is_claimed: boolean;
  is_redeemed: boolean;
  created_at: string;
  brand_name: string;
  brand_image: string | null;
  sender_name: string;
  receiver_name: string;
  receiver_phone_number: string;
  date_issued: string;
  sent: boolean;
  sent_date: string;
  claimed: boolean;
  claimed_date: string | null;
  redeemed: boolean;
  redeemed_date: string | null;
  sender_email: string;
}

export const redeemCardByNumber = async (card_number: string) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiCardRedemptionResponse>
  >(`/branch/branch_redeem_card/?card_number=${card_number}`);
};

export const getCardBalanceByNumber = async (card_number: string) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiCardRedemptionResponse>
  >(`/auth/user_card_balance/?card_number=${card_number}`);
};

export const getPayoutTransactions = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiCompanyPayOutTransactionResponse>
  >(
    `/wema/payout_transaction/?search=${search}&page=${page}&page_size=${page_size}`
  );
};

// Add interface for create brand response
interface ApiCreateBrandResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    brand_name: string;
    category: string;
    min_amount: number | null;
    max_amount: number | null;
    is_active: boolean;
  };
}

export const createBrand = async (data: FormData) => {
  return await httpConfig.post<
    AxiosError,
    AxiosResponse<ApiCreateBrandResponse>
  >('/brand/create_brand/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editBrand = async (data: FormData) => {
  return await httpConfig.put<
    AxiosError,
    AxiosResponse<ApiCreateBrandResponse>
  >('/brand/edit_brand/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBrand = async (brandId: string) => {
  return await httpConfig.delete<
    AxiosError,
    AxiosResponse<ApiCreateBrandResponse>
  >(`/brand/delete_brand/?brand_id=${brandId}`);
};

export const fetchBrands = async ({
  search,
  page,
  page_size,
}: {
  search: string;
  page: number;
  page_size: number;
}) => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiBrandProductResponse>
  >(`/brand/fetch_brand/?search=${search}&page=${page}&page_size=${page_size}`);
};

// Add interface for company logo response
interface ApiCompanyLogoResponse {
  status: boolean;
  message: string;
  company_logo: string | null;
}

export const getCompanyLogo = async () => {
  return await httpConfig.get<
    AxiosError,
    AxiosResponse<ApiCompanyLogoResponse>
  >('/auth/company_logo/');
};

export const uploadCompanyLogo = async (data: FormData) => {
  console.log('API: uploadCompanyLogo called with data:', data);
  try {
    const response = await httpConfig.post<
      AxiosError,
      AxiosResponse<ApiCompanyLogoResponse>
    >('/auth/company_logo/', data);

    return response;
  } catch (error) {
    console.error('API: uploadCompanyLogo error:', error);
    throw error;
  }
};
