/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBrandCards, getBrandCardById } from '../api';
import { ApiAllBrandCardsResponse, ICard } from '@/libs/types/brand.types';
import { AxiosResponse } from 'axios';

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

  return {
    query,
  };
};

export const useGetBrandCardByIdQuery = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: brand_keys.brand(id),
    queryFn: () => getBrandCardById(id),
    select: (data) => data.data,
    enabled: !!id,
    placeholderData: (): ICard | any => {
      const allBrandCards: AxiosResponse<ApiAllBrandCardsResponse> | undefined =
        queryClient.getQueryData(brand_keys.all);
      if (allBrandCards) {
        const card = allBrandCards.data?.results?.find((card) => {
          return card.id === id;
        });

        return card;
      }
      return undefined;
    },
  });

  return {
    query,
  };
};
