import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchBranches,
  fetchCompanyOrderHistory,
  getCompanyDashboard,
} from '../api';

export const company_keys = {
  company_dashboard: () => ['company', 'dashboard'],
  company_branches: (search: string, page: number, page_size: number) => [
    'company',
    'branches',
    {
      search,
      page,
      page_size,
    },
  ],
  company_history: () => ['company', 'history'],
};

export const useGetCompanyDashboardQuery = () => {
  const query = useQuery({
    queryKey: company_keys.company_dashboard(),
    queryFn: () => getCompanyDashboard(),
    select: (data) => data.data,
  });

  return {
    query,
  };
};

export const useGetCompanyBranches = ({
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
    queryKey: company_keys.company_branches(search, page + 1, page_size),
    queryFn: () =>
      fetchBranches({
        search,
        page,
        page_size,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });

  const prefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: company_keys.company_branches(search, page + 1, page_size),
      queryFn: () =>
        fetchBranches({
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

export const useGetCompanyHistory = ({
  search = '',
  page = 1,
  page_size = 10,
}: {
  search?: string;
  page?: number;
  page_size?: number;
} = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['company-history', search, page, page_size],
    queryFn: () => fetchCompanyOrderHistory({ search, page, page_size }),
  });

  const prefetchQuery = () => {
    queryClient.prefetchQuery({
      queryKey: ['company-history', search, page + 1, page_size],
      queryFn: () =>
        fetchCompanyOrderHistory({
          search,
          page: page + 1,
          page_size,
        }),
    });
  };

  return { query, prefetchQuery };
};
