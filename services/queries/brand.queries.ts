import { useQuery } from '@tanstack/react-query';
import { getAllBrandCards } from '../api';

const brand_keys = {
  all: ['brands', 'all_cards'],
  brand: (id: string) => [...brand_keys.all, id],
} as const;

export const useGetAllBrandCardsQuery = () => {
  const query = useQuery({
    queryKey: brand_keys.all,
    queryFn: getAllBrandCards,
    select: (data) => data.data,
  });

  //   console.log('Brand Cards:', query.data?.results);

  return {
    query,
  };
};

export const useGetBrandCardByIdQuery = (id: string) => {
  const query = useQuery({
    queryKey: brand_keys.brand(id),
    queryFn: () => getAllBrandCards(),
    select: (data) => data.data,
  });

  return {
    query,
  };
};
