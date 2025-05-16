import { useQuery } from '@tanstack/react-query';
import { fetUserDetails } from '../api';

export const useGetUserInfoQuery = () => {
  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetUserDetails(),
    select: (data) => data.data,
  });

  return {
    query,
  };
};
