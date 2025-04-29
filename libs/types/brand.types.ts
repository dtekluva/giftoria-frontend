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
