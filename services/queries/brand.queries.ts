/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getAllBrandCards, getAllCardSales, getBrandCardById } from '../api';
import { ApiAllBrandCardsResponse, ICard } from '@/libs/types/brand.types';
import { AxiosResponse } from 'axios';

export const brand_keys = {
  all: ['brands', 'all_cards'],
  brand: (id: string) => [...brand_keys.all, id],
  brand_card_sales: (search: string, page: number, page_size: number) => [
    ...brand_keys.all,
    'card',
    'sales',
    {
      search,
      page,
      page_size,
    },
  ],
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

export const useGetBrandCardSalesQuery = ({
  search = '',
  page = 2,
  page_size = 4,
}: {
  search?: string;
  page?: number;
  page_size?: number;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: brand_keys.brand_card_sales(search, page, page_size),
    queryFn: () =>
      getAllCardSales({
        search,
        page,
        page_size,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const prefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: brand_keys.brand_card_sales(search, page + 1, page_size),
      queryFn: () =>
        getAllCardSales({
          search: '',
          page: page + 1,
          page_size: page_size,
        }),
      staleTime: Infinity,
    });
  };

  return {
    query,
    prefetchQuery,
  };
};
