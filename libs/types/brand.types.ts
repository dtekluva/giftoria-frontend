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

export interface ApiBuyCardResponse {
  status: boolean;
  message: string;
  payment_details: {
    status: boolean;
    details: string;
    payment_link: string;
  };
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
