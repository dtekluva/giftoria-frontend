import { BuyCardType } from '../schema';

export interface ICard {
  id: string;
  brand_name: string;
  image: string | null;
  is_active: boolean;
  min_amount?: number;
  max_amount?: number;
}

export interface ApiAllBrandCardsResponse {
  count: number;
  next: null | string;
  previous: null;
  results: ICard[];
}

export interface BuyMultipleCard {
  cards: BuyCardType[]; // Array of BuyCard objects
  password: string; // Required password with a minimum length of 1
}

export interface IBuyCardAgain {
  card_id: string; // ID of the card to be bought again
  password: string; // Required password with a minimum length of 1
}

export interface ApiBuyCardResponse {
  status: boolean;
  message: string;
  payment_reference: string;
  amount: number;
}
export interface ApiBuyCardAgainResponse {
  status: boolean;
  message: string;
  payment_details: string;
  amount: number;
}

export interface CardSale {
  id: string;
  brand: string;
  card_amount: number;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string | null;
  for_who: string;
  occasion: string;
  message: string;
  reference: string;
  is_paid: boolean;
  is_assigned: boolean;
  brand_name: string;
  brand_image: string | null;
  sent: boolean;
  sent_date: string;
  assigned: boolean;
  assigned_date: string;
  redeemed: boolean;
  redeemed_date: string | null;
  sender_email: string;
  amount: string;
}
export interface AssignedCard {
  id: string;
  brand: string;
  card_amount: number;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string | null;
  for_who: string;
  occasion: string;
  message: string;
  reference: string;
  is_paid: boolean;
  is_assigned: boolean;
  brand_name: string;
  brand_image: string | null;
  sent: boolean;
  sent_date: string;
  assigned: boolean;
  assigned_date: string;
  redeemed: boolean;
  redeemed_date: string | null;
  sender_email: string;

  company: null;
  sender: string;
  receiver_email: string;

  card_number: '3ax79y3';
  amount: number;
  balance: number;
  expiry_date: string;
  date_claimed: string | null;
  date_redeemed: null | string;
  is_claimed: boolean;
  is_redeemed: boolean;
  created_at: string | null;

  sender_name: string;

  receiver_name: string;
  receiver_phone_number: string;
  date_issued: string | null;

  claimed: true;
  claimed_date: string | null;
}

export interface ApiCardSalesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CardSale[];
}

export type TransactionStatus = 'PENDING' | 'REDEEMED' | 'DECLINED';

export interface StatusCount {
  PENDING: number;
  REDEEMED: number;
  DECLINED: number;
}

export interface BrandCardTransaction {
  id: string;
  branch: string;
  user: string;
  brand: string;
  card: string;
  amount: number;
  card_value: number;
  balance: number;
  transaction_id: string;
  status: TransactionStatus;
  redeemed: boolean;
  created_at: string;
  card_number: string;
  store_address: string;
}

export interface ApiBrandCardTransactionResponse {
  status_count: StatusCount;
  count: number;
  next: string | null;
  previous: string | null;
  results: BrandCardTransaction[];
}

export interface ApiCompanyDetailsResponse {
  message: string; // Response message
  status: boolean; // Indicates if the request was successful
  balance: number; // Company balance
  company_name: string; // Name of the company
  total_sales: string | null;
  company_address: string | null; // Address of the company (nullable)
  business_type: string | null; // Type of business (nullable)
  registration_number: string | null; // CAC registration number (nullable)
  tin_number: string | null; // Tax Identification Number (nullable)
  date_of_incorporation: string | null; // Date of incorporation (nullable)
  cac_documents: string | null; // URL or reference to CAC documents (nullable)
}

export interface Branch {
  id: string; // Unique identifier for the branch
  branch_name: string; // Name of the branch
  branch_address: string; // Address of the branch
  branch_id: string; // Branch ID
  branch_password: string; // Password for the branch
  is_active: boolean; // Indicates if the branch is active
}

export interface ApiBranchResponse {
  count: number; // Total number of branches
  next: string | null; // URL for the next page of results
  previous: string | null; // URL for the previous page of results
  results: Branch[]; // Array of branch objects
}

export interface AccountDetails {
  company: string;
  sub_company: string | null;
  account_name: string;
  account_number: string;
  bank_name: string;
  bank_code: string;
  request_reference: string;
  request_active: boolean;
}

export interface PaymentDetailsData {
  message: string;
  account_details: AccountDetails;
}

export interface PaymentDetailsInnerData {
  status: string;
  status_code: number;
  data: PaymentDetailsData;
}

export interface PaymentDetailsOuter {
  status_code: number;
  status: boolean;
  data: PaymentDetailsInnerData;
  errors: {
    message: string;
  };
}

export interface ApiPaymentSetupResponse {
  status: boolean;
  message: string;
  payment_details: PaymentDetailsOuter;
}

// Export Category interface
export interface Category {
  id: string;
  category_name: string;
  is_active: boolean;
}

export interface ApiCategoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export interface CompanyPayOutTransaction {
  id: string;
  transaction_reference: string;
  amount: number;
  total_amount: number;
  charges: number;
  status: string;
  narration: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  created_at: string;
  is_reversed: boolean;
}

export interface ApiCompanyPayOutTransactionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CompanyPayOutTransaction[];
}

type Product = {
  id: string;
  brand_name: string;
  category: string;
  image: string;
  is_active: boolean;
  min_amount: number;
  max_amount: number;
};

export type ApiBrandProductResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};
