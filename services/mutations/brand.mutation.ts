import { buyCardSchema, BuyCardType } from '@/libs/schema';
import { showToast } from '@/libs/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { buyCardbyId } from '../api';

export const useByCardsMutation = () => {
  const form = useForm<BuyCardType>({
    resolver: zodResolver(buyCardSchema),
  });

  const mutation = useMutation({
    mutationFn: buyCardbyId,
  });

  const onSubmit = (data: BuyCardType) => {
    const res = mutation.mutateAsync({
      cards: [data],
      password: 'Ashiru123@',
    });

    showToast(res, {
      success: 'Card purchased successfully',
      error: 'Error purchasing card',
      loading: 'Purchasing card...',
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
