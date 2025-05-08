import { useQuery } from '@tanstack/react-query';
import { getCompanyDashboard } from '../api';

export const company_keys = {
  company_dashboard: () => ['company', 'dashboard'],
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
