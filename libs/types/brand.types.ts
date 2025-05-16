import { BuyCardType } from '../schema';

export interface ICard {
  id: string;
  brand_name: string;
  image: string | null;
  is_active: boolean;
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
}

export interface ApiCardSalesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CardSale[];
}

export interface ApiCompanyDetailsResponse {
  message: string; // Response message
  status: boolean; // Indicates if the request was successful
  balance: number; // Company balance
  company_name: string; // Name of the company
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

export interface PaymentDetails {
  status: boolean;
  details: string;
  payment_link: string;
}

export interface ApiPaymentSetupResponse {
  status: boolean;
  message: string;
  payment_details: PaymentDetails;
}
