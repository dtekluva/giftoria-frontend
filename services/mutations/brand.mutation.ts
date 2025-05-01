import { buyCardSchema, BuyCardType } from '@/libs/schema';
import { showToast } from '@/libs/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { buyCardAgainbyId, buyCardbyId } from '../api';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next/client';
import { localStorageStore } from '@/libs/store';
import { BuyMultipleCard } from '@/libs/types/brand.types';
import { toast } from 'sonner';
import { brand_keys } from '../queries/brand.queries';

export const useByCardsMutation = () => {
  const cardId = usePathname()?.split('/').pop();
  const router = useRouter();
  const form = useForm<BuyCardType>({
    resolver: zodResolver(buyCardSchema),
    defaultValues: {
      brand: cardId,
      card_amount: '',
      recipient_name: '',
      recipient_email: '',
      recipient_phone_number: '',
      for_who: '',
      occasion: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: buyCardbyId,
    onSuccess: (query) => {
      router.push(query.data.payment_details.payment_link);
    },
  });

  const saveItemToLocalStorage = () => {
    const cards = localStorageStore.getItem('cards') as BuyMultipleCard;
    form.trigger();
    if (!form.formState.isValid) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!cards) {
      localStorageStore.setItem('cards', {
        cards: [form.getValues()],
        password: getCookie('password') ?? '',
      });
    } else {
      const newCards = [...cards.cards, form.getValues()];
      localStorageStore.setItem('cards', {
        cards: newCards,
        password: getCookie('password') ?? '',
      });
    }
    toast.success('Card added to cart');
    form.reset();
  };

  const onSubmit = (data: BuyCardType) => {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      toast.error('Please sign in to continue');
      router.push('/auth/sign-in');
      return;
    }

    const res = mutation.mutateAsync({
      cards: [
        {
          ...data,
          card_amount: data.card_amount.split(',').join(''),
        },
      ],
      password: getCookie('password') ?? '',
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
    saveItemToLocalStorage,
    isLoading: mutation.isPending,
  };
};

export const useBuyCardById = (id: string) => {
  const queryClient = useQueryClient();

  const data = {
    card_id: id,
    password: getCookie('password') ?? '',
  };

  const mutation = useMutation({
    mutationFn: buyCardAgainbyId,
    mutationKey: ['buy-card-again', id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...brand_keys.all, 'card', 'sales'],
      });
    },
  });

  const buyCard = () => {
    const res = mutation.mutateAsync(data);
    showToast(res, {
      success: 'Card purchased successfully',
      error: 'Error purchasing card',
      loading: 'Purchasing card...',
    });
  };

  return {
    buyCard,
    isLoading: mutation.isPending,
  };
};
