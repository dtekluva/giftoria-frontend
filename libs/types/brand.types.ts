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
