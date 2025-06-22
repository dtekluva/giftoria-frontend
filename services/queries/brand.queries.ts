/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiAllBrandCardsResponse, ICard } from '@/libs/types/brand.types';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  approveBuyer,
  bankTransferCompeleted,
  fetchBrands,
  fetchCategories,
  getAllBrandCards,
  getAllCardSales,
  getBrandCardById,
  getBuyerApprovalStaus,
  getCardAssignedById,
  getCardBalanceByNumber,
  getCardSalesById,
  getPayoutTransactions,
  getReceivedCardSales,
  redeemCardByNumber,
  searchAllBrands,
} from '../api';

export const brand_keys = {
  all: ['brands', 'all_cards'],
  allSearch: (search: string, showAllCards: boolean, category?: string) => [
    ...brand_keys.all,
    {
      search,
      showAllCards,
      category,
    },
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
  brand_received_card: (search: string, page: number, page_size: number) => [
    ...brand_keys.all,
    'card',
    'received',
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
  brand_card_assigned_by_id: (id: string) => [
    ...brand_keys.all,
    'card',
    'sales',
    id,
  ],
  search_all_brands: (search: string, page: number, page_size: number) => [
    ...brand_keys.all,
    'card',
    'sales',
    {
      search,
      page,
      page_size,
    },
  ],
  categories: ['brands', 'categories'],
  payout_transactions: (search: string, page: number, page_size: number) => [
    ...brand_keys.all,
    'payout',
    'transactions',
    {
      search,
      page,
      page_size,
    },
  ],
  fetch_brands: (search: string, page: number, page_size: number) => [
    ...brand_keys.all,
    'fetch_brands',
    {
      search,
      page,
      page_size,
    },
  ],
  buyer_approval_status: (id: string) => ['buyer_approval_status', id],
} as const;

export const useGetAllBrandCardsQuery = ({
  search = '',
  showAllCards = false,
  category = '',
}: {
  search?: string;
  showAllCards?: boolean;
  category?: string;
}) => {
  const query = useQuery({
    queryKey: brand_keys.allSearch(search, showAllCards, category),
    queryFn: () => getAllBrandCards({ search, showAllCards, category }),
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
export const useGetReceivedBrandCardSalesQuery = ({
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
    queryKey: brand_keys.brand_received_card(search, page, page_size),
    queryFn: () =>
      getReceivedCardSales({
        search,
        page,
        page_size,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const prefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: brand_keys.brand_received_card(search, page + 1, page_size),
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
  page = 1,
  page_size = 10,
}: {
  search?: string;
  page?: number;
  page_size?: number;
}) => {
  const query = useQuery({
    queryKey: brand_keys.search_all_brands(search, page, page_size),
    queryFn: () =>
      searchAllBrands({
        search,
        page,
        page_size,
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

export const useGetSingleCardAssigendQuery = (id: string) => {
  const query = useQuery({
    queryKey: brand_keys.brand_card_assigned_by_id(id),
    queryFn: () => getCardAssignedById(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useBankTransferCompeleted = (
  enabled: boolean,
  reference: string
) => {
  const router = useRouter();

  console.log('reference', reference, enabled);
  const query = useQuery({
    queryKey: ['bank_transfer_completed'],
    queryFn: () => bankTransferCompeleted(reference as string),
    select: (data) => data.data,
    enabled: !!reference && enabled,

    refetchInterval(query) {
      if (query.state.data?.data.status && enabled) {
        toast.success('Payment completed successfully');
        router.push('/my-orders');
        return !enabled && false;
      }

      return 2 * 60 * 10; // 2 minutes
    },
  });

  return {
    query,
  };
};

export const useGetCategoriesQuery = () => {
  const query = useQuery({
    queryKey: brand_keys.categories,
    queryFn: fetchCategories,
    select: (data) => data.data,
  });

  return {
    query,
  };
};

export const useGetPayoutTransactionsQuery = ({
  search = '',
  page = 1,
  page_size = 10,
}: {
  search?: string;
  page?: number;
  page_size?: number;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: brand_keys.payout_transactions(search, page, page_size),
    queryFn: () =>
      getPayoutTransactions({
        search,
        page,
        page_size,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const prefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: brand_keys.payout_transactions(search, page + 1, page_size),
      queryFn: () =>
        getPayoutTransactions({
          search,
          page: page + 1,
          page_size,
        }),
      staleTime: Infinity,
    });
  };

  return {
    query,
    prefetchQuery,
  };
};

export const useRedeemCardQuery = (card_number: string) => {
  const query = useQuery({
    queryKey: ['redeem_card', card_number],
    queryFn: () => redeemCardByNumber(card_number),
    select: (data) => data.data,
    enabled: !!card_number,
  });

  return {
    query,
  };
};

export const useGetCardBalanceQuery = (card_number: string) => {
  const query = useQuery({
    queryKey: ['get_card_balance', card_number],
    queryFn: () => getCardBalanceByNumber(card_number),
    select: (data) => data.data,
    enabled: !!card_number,
  });

  return {
    query,
  };
};

export const useBuyerApprovalQuery = (id: string) => {
  const query = useQuery({
    queryKey: ['buyer_approval', id],
    queryFn: () => approveBuyer(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useGetBuyerApprovalStatus = (id: string) => {
  const query = useQuery({
    queryKey: brand_keys.buyer_approval_status(id),
    queryFn: () => getBuyerApprovalStaus(id),
    enabled: !!id,
  });

  return {
    query,
  };
};

export const useFetchBrandsQuery = ({
  search = '',
  page = 1,
  page_size = 10,
}: {
  search?: string;
  page?: number;
  page_size?: number;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: brand_keys.fetch_brands(search, page, page_size),
    queryFn: () =>
      fetchBrands({
        search,
        page,
        page_size,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const prefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: brand_keys.fetch_brands(search, page + 1, page_size),
      queryFn: () =>
        fetchBrands({
          search,
          page: page + 1,
          page_size,
        }),
      staleTime: Infinity,
    });
  };

  return {
    query,
    prefetchQuery,
  };
};
