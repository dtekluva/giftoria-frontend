/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
  buyCardSchema,
  BuyCardType,
  cardBalanceSchema,
  CardBalanceType,
  companyPayOutSchema,
  CompanyPayOutType,
  createBrandSchema,
  CreateBrandType,
} from '@/libs/schema';
import { localStorageStore } from '@/libs/store';
import { showToast } from '@/libs/toast';
import {
  ApiPaymentSetupResponse,
  BuyMultipleCard,
  IBuyCardAgain,
} from '@/libs/types/brand.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next/client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  buyCardAgainbyId,
  buyCardbyId,
  getAIMessage,
  payViaBank,
  payViaPayStack,
  companyPayOut,
  redeemedGiftCard,
  createBrand,
  editBrand,
  deleteBrand,
} from '../api';

export const useByCardsMutation = () => {
  const cardId = usePathname()?.split('/').pop();

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
      return false;
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
    return true;
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
    return saveItemToLocalStorage();
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('paystack');
  const [reference, setReference] = useState('');

  const {
    payThroughPayStack,
    payThroughBank,
    isPaying,
    isPayingBank,
    bankData,
  } = usePayBrand();

  const mutation = useMutation({
    mutationFn: buyCardAgainbyId,
    mutationKey: ['buy-card-again', 'card'],
    onSuccess: (response) => {
      setShowPaymentModal(true);
      setReference(response.data.payment_details);
    },
  });

  const handlePayment = () => {
    if (reference) {
      if (selectedPayment.toLowerCase() === 'paystack') {
        payThroughPayStack(reference);
      } else {
        payThroughBank(reference);
      }
    }
  };

  const buyCard = async (data: Partial<IBuyCardAgain>) => {
    try {
      const res = mutation.mutateAsync({
        card_id: data.card_id ?? '',
        password: getCookie('password') ?? '',
      });
      showToast(res, {
        success: 'Card purchased successfully',
        error: 'Error purchasing card',
        loading: 'Purchasing card...',
      });
    } catch (error) {
      console.error('Buy card error:', error);
    }
  };

  return {
    buyCard,
    isBuyingCard: mutation.isPending,
    showPaymentModal,
    setShowPaymentModal,
    selectedPayment,
    setSelectedPayment,
    isPaying,
    isPayingBank,
    bankData,
    payThroughPayStack,
    payThroughBank,
    handlePayment,
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
    onSuccess: (data: any) => {
      localStorageStore.removeItem('cards');
      router.push(data.data.payment_details.payment_link);
    },
    onError: () => {
      toast.error('An error occured');
    },
  });

  const bankMutation = useMutation({
    mutationFn: payViaBank,
    mutationKey: ['pay', 'bank'],
    onSuccess: (data) => {
      localStorageStore.removeItem('cards');
      setBankData(data.data);
    },
    onError: () => {
      toast.error('An error occured');
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
  const form = useForm<CompanyPayOutType>({
    resolver: zodResolver(companyPayOutSchema),
    defaultValues: {
      account_number: '',
      bank_name: '',
      account_name: '',
      bank_code: '',
      amount: 0,
      password: '',
      narration: '',
    },
  });

  const mutation = useMutation({
    mutationFn: companyPayOut,
    mutationKey: ['company-payout'],
    onSuccess: (data) => {
      toast.success(data.data.message || 'Withdrawal request successful');
      form.reset();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to process withdrawal request'
      );
    },
  });

  const onSubmit = async (data: CompanyPayOutType) => {
    try {
      const res = mutation.mutateAsync(data);

      showToast(res, {
        success: 'Processing request',
        error: 'Error processing request',
        loading: 'Request withdrawed successfully',
      });
    } catch (error) {
      console.error('Withdrawal request error:', error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useGetAIMessage = () => {
  const mutation = useMutation({
    mutationFn: getAIMessage,
    mutationKey: ['ai-message'],
  });

  const generateMessage = async (message: string) => {
    try {
      const response = await mutation.mutateAsync({ message });
      return response.data.message;
    } catch {
      toast.error('Failed to generate AI message');
      return null;
    }
  };

  return {
    generateMessage,
    isGenerating: mutation.isPending,
  };
};

export const useCardBalanceMutation = () => {
  const form = useForm<CardBalanceType>({
    resolver: zodResolver(cardBalanceSchema),
    defaultValues: {
      card_number: '',
      amount: '',
    },
  });

  const mutation = useMutation({
    mutationFn: redeemedGiftCard,
    mutationKey: ['card-balance'],
  });

  const onSubmit = async (data: CardBalanceType) => {
    try {
      const res = mutation.mutateAsync(data);
      showToast(res, {
        success: 'Card Succcessfully Redeemed',
        error: 'Error processing request',
        loading: 'Processing Reqeust',
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to redeem card');
    }
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const form = useForm<CreateBrandType>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      brand_name: '',
      category: '',
      min_amount: undefined,
      max_amount: undefined,
      is_active: true,
      image: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: createBrand,
    mutationKey: ['create-brand'],
    onSuccess: (data) => {
      toast.success(data.data.message || 'Brand created successfully');
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create brand');
    },
  });

  const onSubmit = async (data: CreateBrandType) => {
    try {
      const formData = new FormData();
      formData.append('brand_name', data.brand_name);
      formData.append('category', data.category);
      if (data.min_amount !== undefined) {
        formData.append('min_amount', data.min_amount.toString());
      }
      if (data.max_amount !== undefined) {
        formData.append('max_amount', data.max_amount.toString());
      }
      formData.append('is_active', data.is_active?.toString() ?? 'true');
      if (data.image) {
        formData.append('image', data.image);
      }

      const res = mutation.mutateAsync(formData as any);
      showToast(res, {
        success: 'Brand created successfully',
        error: 'Error creating brand',
        loading: 'Creating brand...',
      });
    } catch (error) {
      console.error('Create brand error:', error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useEditBrand = (brandId: string) => {
  const queryClient = useQueryClient();
  const form = useForm<CreateBrandType>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      brand_name: '',
      category: '',
      min_amount: undefined,
      max_amount: undefined,
      is_active: true,
      image: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => editBrand(formData),
    mutationKey: ['edit-brand'],
    onSuccess: (data) => {
      toast.success(data.data.message || 'Brand updated successfully');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      queryClient.invalidateQueries({ queryKey: ['brand', brandId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update brand');
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error('Update brand error:', error);
    }
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBrand,
    mutationKey: ['delete-brand'],
    onSuccess: (data) => {
      toast.success(data.data.message || 'Brand deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete brand');
    },
  });

  const deleteBrandById = async (brandId: string) => {
    try {
      const res = mutation.mutateAsync(brandId);
      showToast(res, {
        success: 'Brand deleted successfully',
        error: 'Error deleting brand',
        loading: 'Deleting brand...',
      });
    } catch (error) {
      console.error('Delete brand error:', error);
    }
  };

  return {
    deleteBrandById,
    isLoading: mutation.isPending,
  };
};
