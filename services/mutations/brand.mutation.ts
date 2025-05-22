/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  buyCardSchema,
  BuyCardType,
  requestPayWithdrawalSchema,
} from '@/libs/schema';
import { localStorageStore } from '@/libs/store';
import { showToast } from '@/libs/toast';
import {
  ApiPaymentSetupResponse,
  BuyMultipleCard,
  IBuyCardAgain,
} from '@/libs/types/brand.types';
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
import { useState } from 'react';

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
    },
  });

  const saveItemToLocalStorage = () => {
    const cards = localStorageStore.getItem('cards') as BuyMultipleCard;
    form.trigger();

    if (Object.keys(form.formState.errors)[0]) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log('No cards found in local storage', cards);
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

  const onSubmit = () => {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
      toast.error('Please sign in to continue');
      router.push('/auth/sign-in');
      return;
    }
    saveItemToLocalStorage();
  };

  return {
    form,
    onSubmit,
    saveItemToLocalStorage,
    deleteItemFromLocalStorage,
  };
};

export const useByAllCardsMutation = (selectedPayment: string) => {
  const {
    payThroughPayStack,
    payThroughBank,
    isPaying,
    isPayingBank,
    bankData,
  } = usePayBrand();
  const mutation = useMutation({
    mutationFn: buyCardbyId,
    mutationKey: ['buy-all-card', 'card'],
    onSuccess: (query) => {
      const cards = localStorageStore.getItem('cards') as BuyMultipleCard;
      if (cards && selectedPayment) {
        if (selectedPayment?.toLowerCase() === 'paystack') {
          payThroughPayStack(query.data.payment_reference);
        } else {
          payThroughBank(query.data.payment_reference);
        }
        return;
      }
    },
  });

  const buyAllCard = () => {
    const cards = JSON.parse(
      localStorageStore.getItem('cards') ?? 'null'
    ) as BuyMultipleCard;

    const formattedCards = {
      cards: cards.cards.map((card) => {
        return {
          ...card,
          card_amount: card.card_amount.split(',').join(''),
        };
      }),
      password: getCookie('password') ?? '',
    };

    const res = mutation.mutateAsync(formattedCards);

    showToast(res, {
      success: 'Card purchased successfully',
      error: 'Error purchasing card',
      loading: 'Purchasing card...',
    });
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

  return {
    isLoading: mutation.isPending,
    buyAllCard,
    payingThroughPayStack: isPaying,
    payingThroughBank: isPayingBank,
    deleteItemFromLocalStorage,
    bankData,
    mutation,
  };
};

export const useBuyCardById = () => {
  const mutation = useMutation({
    mutationFn: buyCardAgainbyId,
    mutationKey: ['buy-card-again', 'card'],
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
  const [bankData, setBankData] = useState<null | ApiPaymentSetupResponse>(
    null
  );
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
      setBankData(data.data);
    },
  });

  const payThroughBank = async (reference: string) => {
    await bankMutation.mutateAsync(reference);
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
    bankData,
    setBankData,
  };
};

export const useRequestWithdrawal = () => {
  const form = useForm({
    resolver: zodResolver(requestPayWithdrawalSchema),
  });
  return {
    form,
  };
};
