'use client';

import AddingShoppingIcon from '@/components/icon/add-shopping-icon';
import AIIcon from '@/components/icon/ai-icon';
import SendIcon from '@/components/icon/send-icon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useByCardsMutation,
  useGetAIMessage,
} from '@/services/mutations/brand.mutation';
import { useGetBrandCardByIdQuery } from '@/services/queries/brand.queries';
import { getCookie } from 'cookies-next/client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FALLBACK_IMAGE = 'https://placehold.co/500x300.png?text=Gift+Card';
import { toast } from 'sonner';

const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Graduation',
  'Baby Shower',
  "Father's Day",
  "Valentine's Day",
  'Christmas',
  'Just Because',
  'Congratulations',
  'Thank You',
  'Apology',
  'Housewarming',
  'Other',
];

const RECIPIENTS = [
  'My Sister',
  'My Brother',
  'A Friend',
  'My Partner',
  'My Spouse',
  'My Son',
  'My Daughter',
  'My Father',
  'My Mother',
  'My Uncle',
  'My Aunty',
  'My Grand Parents',
  'A Colleague',
  'A Mentor',
  'A Client',
  'My Boss',
  'My Colleague',
  'My Pastor',
  'Myself',
  'Other',
];

function GiftCardDetails() {
  const { form, onSubmit, saveItemToLocalStorage } = useByCardsMutation();
  const { generateMessage } = useGetAIMessage();
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [imgSrc, setImgSrc] = useState(FALLBACK_IMAGE);

  const cardId = usePathname()?.split('/').pop();
  const { query } = useGetBrandCardByIdQuery(cardId ?? '');
  const router = useRouter();

  useEffect(() => {
    form.setValue('image', query?.data?.image ?? '');
    if (query?.data?.image) setImgSrc(query.data.image);
  }, [query?.data?.image, form]);

  const handleGenerateMessage = async () => {
    const message = form.getValues('message');

    if (!message) {
      toast.error('Please enter a message first');
      return;
    }

    setIsGeneratingMessage(true);
    const generatedMessage = await generateMessage(message);
    if (generatedMessage) {
      form.setValue('message', generatedMessage);
    }
    setIsGeneratingMessage(false);
  };

  const handleProceedToPayment = async () => {
    const isValid = await saveItemToLocalStorage();
    if (isValid) {
      // Force a cart update event
      const event = new Event('cartUpdated');
      window.dispatchEvent(event);

      const accessToken = getCookie('access_token');
      if (!accessToken) {
        toast.error('Please sign in to continue');
        router.push('/auth/sign-in');
      } else {
        router.push('/order-summary');
      }
    }
  };

  const handleAddToCart = async () => {
    const isValid = await saveItemToLocalStorage();
    if (isValid) {
      // Force a cart update event
      const event = new Event('cartUpdated');
      window.dispatchEvent(event);

      // Also trigger a storage event manually since it won't fire in the same window
      const cartItems = localStorage.getItem('cards');
      if (cartItems && form.formState.isValid) {
        localStorage.setItem('cards', cartItems);
      }

      // router.push('/gift-card');
    }
  };

  return (
    <div className='mx-auto lg:container md:px-14 px-4 py-3 md:py-7'>
      <div className='border rounded-[10px] md:p-10 p-3 md:rounded-[20px] md:grid grid-cols-2 gap-[60px] font-dm-sans items-center space-y-4 md:space-y-0'>
        {query.isPending ? (
          <div className='relative w-full aspect-[3/2] lg:max-w-[500px] rounded-2xl bg-gray-200 animate-pulse shadow-[0_2px_8px_rgba(0,0,0,0.14)]' />
        ) : (
          <div className='relative w-full lg:max-w-[500px]'>
            <div className='animate-card-glow absolute -inset-[8px] rounded-[20px] blur-xl pointer-events-none' />
          <div className='group relative w-full aspect-[3/2] overflow-hidden rounded-2xl
            shadow-[0_2px_8px_rgba(0,0,0,0.14),0_1px_3px_rgba(0,0,0,0.1)]
            hover:shadow-[0_14px_32px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.14)]
            hover:-translate-y-1.5 transition-all duration-300 ease-out'>
            <Image
              src={imgSrc}
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              alt={query?.data?.brand_name ?? ''}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent' />
            <div className='absolute inset-0 bg-gradient-to-bl from-black/50 via-transparent to-transparent' />
            <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none' />
            <div className='absolute top-3 right-3 bg-gradient-to-r from-[#c9a84c] to-[#f0d060] text-[#3b1f00] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm'>
              Gift Card
            </div>
            <div className='absolute bottom-0 left-0 right-0 p-3 md:p-4'>
              <p className='text-white/90 text-xs md:text-[14px] font-montserrat uppercase tracking-widest truncate [text-shadow:0_1px_0_rgba(255,255,255,0.35),0_-1px_0_rgba(0,0,0,0.55),1px_0_0_rgba(255,255,255,0.15),-1px_0_0_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.6)]'>
                {query?.data?.brand_name}
              </p>
            </div>
          </div>
          </div>
        )}
        <div>
          <p className='md:mt-4 mt-3 mb-2 md:mb-3 font-bold md:text-2xl text-[#160032] text-base font-montserrat'>
            {query.data?.brand_name}
          </p>
          <p className='lg:leading-[40px] md:leading-[20px] leading-[18px] lg:text-xl md:text-sm text-xs max-w-[585px]'>
            Looking for the perfect gift? Whether it&apos;s fashion,
            electronics, home essentials, beauty products, or more, you&apos;ll
            find it all with our exclusive gift cards! Looking for the perfect
            gift? Whether it&apos;s fashion
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='lg:grid grid-cols-2 md:gap-20 lg:gap-[120px]'>
          <div>
            <h1 className='text-[#160032] text-base md:text-2xl font-semibold md:font-bold md:mt-20 mt-7'>
              Recepient Information
            </h1>
            <div className='font-dm-sans mt-4 space-y-7 md:mt-10'>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='card_amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input
                          id='value'
                          placeholder={
                            query?.data?.min_amount === 0 &&
                            query?.data?.max_amount === 0
                              ? 'This gift card is currently not available'
                              : `Enter amount between ${
                                  query?.data?.min_amount?.toLocaleString() ?? 0
                                } and ${
                                  query?.data?.max_amount?.toLocaleString() ??
                                  'unlimited'
                                }`
                          }
                          className='md:h-12'
                          disabled={
                            query?.data?.min_amount === 0 &&
                            query?.data?.max_amount === 0
                          }
                          {...field}
                          onInput={(e) => {
                            const value = e.currentTarget.value.replace(
                              /\D/g,
                              ''
                            );
                            const numValue = parseInt(value);

                            if (
                              query?.data?.min_amount === 0 &&
                              query?.data?.max_amount === 0
                            ) {
                              form.setError('card_amount', {
                                type: 'manual',
                                message:
                                  'This gift card is currently not available',
                              });
                              return;
                            }

                            if (numValue < (query?.data?.min_amount ?? 0)) {
                              form.setError('card_amount', {
                                type: 'manual',
                                message: `Amount must be at least ${query?.data?.min_amount?.toLocaleString()}`,
                              });
                            } else if (
                              query?.data?.max_amount &&
                              numValue > query.data.max_amount
                            ) {
                              form.setError('card_amount', {
                                type: 'manual',
                                message: `Amount cannot exceed ${query?.data?.max_amount?.toLocaleString()}`,
                              });
                            } else {
                              form.clearErrors('card_amount');
                            }

                            field.onChange(e);
                            e.currentTarget.value = value.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ','
                            );
                          }}
                        />
                      </FormControl>
                      <p className='text-sm text-muted-foreground'>
                        {query?.data?.min_amount === 0 &&
                        query?.data?.max_amount === 0
                          ? 'This gift card is currently not available'
                          : `Available range: ${
                              query?.data?.min_amount?.toLocaleString() ?? 0
                            } - ${
                              query?.data?.max_amount?.toLocaleString() ??
                              'unlimited'
                            }`}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-row flex-wrap mt-4 md:mt-6 gap-3 cursor-pointer'>
                  {Array.from({ length: 5 }).map((_, index) => {
                    const amount = (index + 1) * 10000;
                    const isWithinRange =
                      !(
                        query?.data?.min_amount === 0 &&
                        query?.data?.max_amount === 0
                      ) &&
                      amount >= (query?.data?.min_amount ?? 0) &&
                      (!query?.data?.max_amount ||
                        amount <= query.data.max_amount);

                    return (
                      <div
                        onClick={() => {
                          if (isWithinRange) {
                            form.setValue(
                              'card_amount',
                              amount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            );
                          }
                        }}
                        key={index}
                        className={`p-3 rounded-sm border transition-transform duration-300 hover:scale-105 hover:border-primary ${
                          !isWithinRange ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                        <p>{amount.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='recipient_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input
                          id='receipt_name'
                          placeholder='Who are you sending the gift to?'
                          className='md:h-12'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex gap-3'>
                <div className='space-y-2 flex-1'>
                  <FormField
                    control={form.control}
                    name='recipient_email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Email</FormLabel>
                        <FormControl>
                          <Input
                            id='receipt_email'
                            placeholder='receipt@gmail.com'
                            className='md:h-12'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-2 flex-1'>
                  <FormField
                    control={form.control}
                    name='recipient_phone_number'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            id='receipt_phone_number'
                            placeholder='09131200194'
                            className='md:h-12'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                className='w-full md:h-[70px] h-10 font-semibold text-xs md:text-base font-sans'
                type='button'
                onClick={handleAddToCart}>
                <AddingShoppingIcon />
                Add to cart and continue shoppping
              </Button>
            </div>
          </div>
          <div className='h-full flex flex-col'>
            <h1 className='text-[#160032] text-base md:text-2xl font-semibold md:font-bold md:mt-20 mt-7'>
              Personalize Gift
            </h1>
            <div className='font-dm-sans mt-4 space-y-7 md:mt-10 flex flex-col flex-1'>
              <div className='flex gap-3'>
                <div className='space-y-2 flex-1'>
                  <FormField
                    control={form.control}
                    name='for_who'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who is it for?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='min-h-12 w-full'>
                              <SelectValue placeholder='Select recipient' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='font-dm-sans overflow-y-auto max-h-[400px]'>
                            {RECIPIENTS.map((recipient) => (
                              <SelectItem key={recipient} value={recipient}>
                                {recipient}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='space-y-2 flex-1'>
                  <FormField
                    control={form.control}
                    name='occasion'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is the occasion?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='min-h-12 w-full'>
                              <SelectValue placeholder='Select occasion' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='font-dm-sans'>
                            {OCCASIONS.map((occasion) => (
                              <SelectItem key={occasion} value={occasion}>
                                {occasion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personalized Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className='min-h-[74px] md:min-h-[126px] md:max-h-[126px] resize-none'
                          maxLength={255}
                          {...field}
                        />
                      </FormControl>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Max length is 255 characters.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='bg-[#F6F3FB] py-3 flex flex-row gap-2 md:gap-5 items-center md:py-4 md:px-6 px-3 -mt-3 rounded-[10px]'>
                <AIIcon />
                <div className='flex-1'>
                  <p className='text-sm text-[#675E8B]'>
                    Need inspiration?
                    <br /> Let our AI help craft the perfect message for you!
                  </p>
                </div>
                <button
                  onClick={handleGenerateMessage}
                  disabled={isGeneratingMessage}
                  className='cursor-pointer disabled:opacity-50'>
                  <SendIcon />
                </button>
              </div>
              <Button
                className='w-full md:h-[70px] h-10 font-semibold text-xs md:text-xl mt-auto'
                type='button'
                onClick={form.handleSubmit(handleProceedToPayment)}>
                Proceed to make payment
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default GiftCardDetails;
