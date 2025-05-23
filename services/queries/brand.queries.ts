/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  bankTransferCompeleted,
  getAllBrandCards,
  getAllCardSales,
  getBrandCardById,
  getCardSalesById,
  searchAllBrands,
} from '../api';
import { ApiAllBrandCardsResponse, ICard } from '@/libs/types/brand.types';
import { AxiosResponse } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const brand_keys = {
  all: ['brands', 'all_cards'],
  allSearch: (search: string, showAllCards: boolean) => [
    ...brand_keys.all,
    { search, showAllCards },
  ],
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
  brand_card_sales_by_id: (id: string) => [
    ...brand_keys.all,
    'card',
    'sales',
    id,
  ],
  search_all_brands: (search: string) => [
    ...brand_keys.all,
    'card',
    'sales',
    {
      search,
    },
  ],
} as const;

export const useGetAllBrandCardsQuery = ({
  search = '',
  showAllCards = false,
}: {
  search?: string;
  showAllCards?: boolean;
}) => {
  const query = useQuery({
    queryKey: brand_keys.allSearch(search, showAllCards),
    queryFn: () => getAllBrandCards({ search, showAllCards }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
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
        queryClient.getQueryData(brand_keys.allSearch('', false)) ??
        queryClient.getQueryData(brand_keys.allSearch('', true));

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
export const useSearchAllBrands = ({
  search = '',
}: {
  search?: string;
  page?: number;
  page_size?: number;
}) => {
  const query = useQuery({
    queryKey: brand_keys.search_all_brands(search),
    queryFn: () =>
      searchAllBrands({
        search,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  return {
    query,
  };
};

export const useGetSingleCardSalesQuery = (id: string) => {
  const query = useQuery({
    queryKey: brand_keys.brand_card_sales_by_id(id),
    queryFn: () => getCardSalesById(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useBankTransferCompeleted = () => {
  const reference = useSearchParams().get('reference');
  const router = useRouter();
  const query = useQuery({
    queryKey: ['bank_transfer_completed'],
    queryFn: () => bankTransferCompeleted(reference as string),
    select: (data) => data.data,
    enabled: !!reference,

    refetchInterval(query) {
      if (query.state.data?.data.status) {
        toast.success('Payment completed successfully');
        router.push('/my-orders');
        return false;
      }
      console.log('Hi dear');
      return 2 * 60 * 100; // 2 minutes
    },
  });

  return {
    query,
  };
};
