/* eslint-disable @typescript-eslint/no-explicit-any */
import { buyCardSchema, BuyCardType } from '@/libs/schema';
import { localStorageStore } from '@/libs/store';
import { showToast } from '@/libs/toast';
import { BuyMultipleCard, IBuyCardAgain } from '@/libs/types/brand.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next/client';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  buyCardAgainbyId,
  buyCardbyId,
  payViaBank,
  payViaPayStack,
} from '../api';

export const useByCardsMutation = (selectedPayment?: string) => {
  const cardId = usePathname()?.split('/').pop();
  const router = useRouter();
  const { payThroughPayStack, payThroughBank } = usePayBrand();
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
    mutationKey: ['buy-card', 'card'],
    onSuccess: (query) => {
      const cards = localStorageStore.getItem('cards') as BuyMultipleCard;
      if (cards) {
        console.log(selectedPayment, 'selectedPayment');
        if (selectedPayment?.toLowerCase() === 'paystack') {
          payThroughPayStack(query.data.payment_reference);
        } else {
          payThroughBank(query.data.payment_reference);
        }
        return;
      }

      router.push(`/order-summary?reference=${query.data.payment_reference}`);
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
      const localCards = JSON.parse(cards as any) as BuyMultipleCard;
      const newCards = [...localCards.cards, form.getValues()];
      localStorageStore.setItem('cards', {
        cards: newCards,
        password: getCookie('password') ?? '',
      });
    }
    toast.success('Card added to cart');
  };

  const deleteItemFromLocalStorage = (id: number | string) => {
    const cards = JSON.parse(
      localStorageStore.getItem('cards') as any
    ) as BuyMultipleCard;
    if (cards) {
      const newCards = cards.cards.filter((_, index) => index !== id);

      localStorageStore.setItem('cards', {
        cards: newCards,
        password: getCookie('password') ?? '',
      });
    }
  };

  const onSubmit = (data: BuyCardType) => {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      toast.error('Please sign in to continue');
      router.push('/auth/sign-in');
      return;
    }

    saveItemToLocalStorage();

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

  const buyAllCards = () => {
    const storedCards: BuyMultipleCard = JSON.parse(
      localStorage.getItem('cards') ?? 'null'
    );

    const res = mutation.mutateAsync({
      ...storedCards,
      cards: storedCards.cards.map((card) => ({
        ...card,
        card_amount: card.card_amount.split(',').join(''),
      })),
    });
    showToast(res, {
      success: 'Card purchased successfully',
      error: 'Error purchasing card',
      loading: 'Purchasing cards...',
    });
  };

  return {
    form,
    onSubmit,
    saveItemToLocalStorage,
    isLoading: mutation.isPending,
    deleteItemFromLocalStorage,
    buyAllCards,
  };
};

export const useBuyCardById = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: buyCardAgainbyId,
    mutationKey: ['buy-card-again', 'card'],
    onSuccess: (data) => {
      router.push(`/order-summary?reference=${data.data.payment_reference}`);
    },
  });

  const buyCard = (data: Partial<IBuyCardAgain>) => {
    const res = mutation.mutateAsync({
      card_id: data.card_id ?? '',
      password: getCookie('password') ?? '',
    });
    console.log(res, 'res');
    showToast(res, {
      success: 'Card purchased successfully',
      error: 'Error purchasing card',
      loading: 'Purchasing card...',
    });
  };

  return {
    buyCard,
    isBuyingCard: mutation.isPending,
  };
};

export const usePayBrand = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: payViaPayStack,
    mutationKey: ['pay', 'card'],
    onSuccess: (data) => {
      router.push(data.data.payment_details.payment_link);
    },
  });

  const bankMutation = useMutation({
    mutationFn: payViaBank,
    mutationKey: ['pay', 'bank'],
    onSuccess: (data) => {
      router.push(data.data.payment_details.payment_link);
    },
  });

  const payThroughBank = (reference: string) => {
    const res = bankMutation.mutateAsync(reference);
    showToast(res, {
      success: 'Payment successful',
      error: 'Error processing payment',
      loading: 'Processing payment...',
    });
  };

  const payThroughPayStack = (reference: string) => {
    const res = mutation.mutateAsync(reference);
    showToast(res, {
      success: 'Payment successful',
      error: 'Error processing payment',
      loading: 'Processing payment...',
    });
  };

  return {
    payThroughPayStack,
    isPaying: mutation.isPending,
    payThroughBank,
    isPayingBank: bankMutation.isPending,
  };
};
