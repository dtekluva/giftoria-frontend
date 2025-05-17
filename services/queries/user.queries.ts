import { useQuery } from '@tanstack/react-query';
import { fetUserDetails } from '../api';

export const user_keys = {
  userInfo: () => ['userInfo'],
};

export const useGetUserInfoQuery = () => {
  const query = useQuery({
    queryKey: user_keys.userInfo(),
    queryFn: () => fetUserDetails(),
    select: (data) => data.data,
  });

  return {
    query,
  };
};
