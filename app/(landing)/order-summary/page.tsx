'use client';
import TrashOutlineIcon from '@/components/icon/trash-outline-icon';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BuyMultipleCard } from '@/libs/types/brand.types';
import { useByAllCardsMutation } from '@/services/mutations/brand.mutation';

import { BankTransferModal } from '@/components/custom/bank-transfer-modal';
import BankTransferIcon from '@/components/icon/bank-transfer-icon';
import PayStackIcon from '@/components/icon/paystack-icon';
import { getCookie } from 'cookies-next/client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const paymentService = [
  {
    name: 'Paystack',
    description: 'Pay securely with paystack',
    type: 'paystack',
    icon: <PayStackIcon />,
  },
  {
    name: 'Bank Transfer',
    description: 'Pay directly from your bank',
    type: 'transfer',
    icon: <BankTransferIcon />,
  },
];

function OrderSummary() {
  const [cards, setCards] = useState<BuyMultipleCard | null>(null);

  // Add a state to track selected payment method
  const [selectedPayment, setSelectedPayment] = useState(
    paymentService[0].name
  );

  const {
    buyAllCard,
    payingThroughBank,
    deleteItemFromLocalStorage,
    bankData,
    mutation,
  } = useByAllCardsMutation(selectedPayment);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const referenceId = useSearchParams()?.get('reference');

  const access_token = getCookie('access_token');

  useEffect(() => {
    if (selectedPayment.toLowerCase() !== 'paystack')
      setShowSuccessModal(mutation.isSuccess);
  }, [mutation.isSuccess, selectedPayment]);

  // Load cards from localStorage when the component mounts
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('cards') ?? 'null');
    setCards(storedCards);
  }, []);

  // Handle deleting an item
  const handleDelete = (brand: number) => {
    deleteItemFromLocalStorage(brand);

    // Update the state after deleting the item
    setCards((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        cards: prev.cards.filter((_, index) => index !== brand),
      };
    });
  };

  const router = useRouter();

  // Simulate payment success callback
  const handlePayment = async () => {
    if (!access_token) {
      toast.error('Please sign in to continue');
      router.push('/auth/sign-in');
      return;
    }

    await buyAllCard();
  };

  // Handler for confirming transfer
  // const handleConfirmTransfer = async () => {
  //   setLoadingTransfer(true);
  //   useBankTransferCompeleted()
  //   try {
  //     // Fire the request (simulate what you do in loading-transaction)
  //     const reference =
  //       bankData?.payment_details?.data?.data?.account_details
  //         ?.request_reference;
  //     if (reference) {
  //       await bankTransferCompeleted(reference);

  //     }
  //   } catch (e) {
  //     console.error('Error confirming transfer:', e);
  //   } finally {
  //     setLoadingTransfer(false);
  //   }
  // };

  return (
    <div className='container mx-auto p-4 mt-2 md:mt-8'>
      <div className='lg:flex justify-between items-center'>
        <h1 className='md:text-2xl font-bold text-base'>Order Summary</h1>
        {/* <div className='p-3 pl-3 px-5 border rounded-[12px] border-[#E2E6EE] flex gap-2 items-center max-w-[90%] mx-auto mt-4 lg:mt-0 lg:max-w-[290px] lg:mx-0'>
          <div>
            <SearchIcon />
          </div>
          <input
            placeholder='Search'
            className='border-0 focus:border-0 focus:outline-none focus:ring-0 flex-1'
          />
          <div className='pl-4 border-l border-[#93A3C0]'>
            <FilterSearchIcon />
          </div>
        </div> */}
      </div>
      <ul className='mt-4 md:mt-6 space-y-4'>
        {cards?.cards?.map((card, index) => (
          <li
            key={index}
            className='lg:flex items-center justify-between space-y-4 lg:space-y-0 gap-4 pb-6 border-b'>
            <div className='flex items-center gap-4 font-montserrat'>
              <Image src={card.image ?? ''} width={160} height={100} alt='' />
              <div className='space-y-2 md:space-y-3'>
                <p className='text-sm font-medium'>₦{card.card_amount}</p>
                <div className='md:flex items-center gap-4'>
                  <p className='text-xs font-dm-sans'>{card.recipient_name}</p>

                  <p className='mt-1 md:mt-0 text-xs'>{card.recipient_email}</p>
                </div>
                <div className='flex items-center'>
                  {/* <OutlineEditIcon className='cursor-pointer' /> */}
                  <button
                    className='cursor-pointer'
                    onClick={() => handleDelete(index)}>
                    <TrashOutlineIcon className='cursor-pointer' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
              {card.message && (
                <div className='px-3 md:py-5  py-3 bg-[#F6F3FB] rounded-[10px] max-w-[440px] flex-1'>
                  <article className='text-[6px] md:text-[10px]'>
                    {card.message}
                  </article>
                </div>
              )}
              <div className='md:flex-none flex-1 text-end'>
                <p className='text-sm md:text-base font-bold'>
                  ₦{card.card_amount.toLocaleString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='mt-[20px] md:mt-[30px] flex justify-end pb-6 border-b'>
        <div className='flex md:gap-[109px] gap-10'>
          <p className='text-sm md:text-[20px]'>TOTAL</p>
          <p className='text-sm md:text-[20px]'>
            {'₦' +
              (cards?.cards
                ?.map((card) => +card.card_amount.split(',').join(''))
                .reduce((a, b) => a + b, 0)
                .toLocaleString() ?? 0)}
          </p>
        </div>
      </div>
      {((cards?.cards.length ?? 0) > 0 || referenceId) && (
        <>
          {/* KYC Verification */}
          <div className='pt-[30px] md:pt-10'>
            <h2 className='font-bold lg:text-2xl md:text-xl text-base'>
              Identity Verification
            </h2>
            <p className='mt-1 text-xs md:text-sm text-gray-500'>
              Required before payment. Upload clear, well-lit photos.
            </p>

            {/* Disclaimer banner */}
            <div className='mt-4 flex gap-3 items-start bg-amber-50 border border-amber-200 rounded-xl p-4'>
              <div className='mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center'>
                <span className='text-white text-[10px] font-bold leading-none'>!</span>
              </div>
              <p className='text-xs md:text-sm text-amber-800 leading-relaxed'>
                <span className='font-semibold'>Important:</span> You may only fund using your own bank account or card. Payments from third-party accounts or cards will be declined and your order may be cancelled.
              </p>
            </div>

            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* ID Upload */}
              <div
                onClick={() => idInputRef.current?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-5 flex flex-col items-center gap-3 transition-all duration-200 select-none
                  ${idFile ? 'border-green-400 bg-green-50' : 'border-[#E2E6EE] hover:border-primary/60 bg-gray-50/50'}`}>
                <input
                  ref={idInputRef}
                  type='file'
                  accept='image/*,.pdf'
                  className='hidden'
                  onChange={(e) => setIdFile(e.target.files?.[0] ?? null)}
                />
                {idFile ? (
                  <>
                    <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                      <svg className='w-5 h-5 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <div className='text-center'>
                      <p className='text-xs font-semibold text-green-700'>ID Uploaded</p>
                      <p className='text-[10px] text-green-600 mt-0.5 max-w-[180px] truncate'>{idFile.name}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIdFile(null); if (idInputRef.current) idInputRef.current.value = ''; }}
                      className='text-[10px] text-gray-400 hover:text-red-400 transition-colors'>
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                      <svg className='w-5 h-5 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0' />
                      </svg>
                    </div>
                    <div className='text-center'>
                      <p className='text-xs font-semibold text-gray-700'>Government-issued ID</p>
                      <p className='text-[10px] text-gray-400 mt-0.5'>Passport, NIN slip, Driver&apos;s licence</p>
                      <p className='text-[10px] text-primary mt-2 font-medium'>Tap to upload</p>
                    </div>
                  </>
                )}
              </div>

              {/* Selfie Upload */}
              <div
                onClick={() => selfieInputRef.current?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-5 flex flex-col items-center gap-3 transition-all duration-200 select-none
                  ${selfieFile ? 'border-green-400 bg-green-50' : 'border-[#E2E6EE] hover:border-primary/60 bg-gray-50/50'}`}>
                <input
                  ref={selfieInputRef}
                  type='file'
                  accept='image/*'
                  capture='user'
                  className='hidden'
                  onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)}
                />
                {selfieFile ? (
                  <>
                    <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center'>
                      <svg className='w-5 h-5 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                      </svg>
                    </div>
                    <div className='text-center'>
                      <p className='text-xs font-semibold text-green-700'>Selfie Uploaded</p>
                      <p className='text-[10px] text-green-600 mt-0.5 max-w-[180px] truncate'>{selfieFile.name}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelfieFile(null); if (selfieInputRef.current) selfieInputRef.current.value = ''; }}
                      className='text-[10px] text-gray-400 hover:text-red-400 transition-colors'>
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                      <svg className='w-5 h-5 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </div>
                    <div className='text-center'>
                      <p className='text-xs font-semibold text-gray-700'>Selfie / Live photo</p>
                      <p className='text-[10px] text-gray-400 mt-0.5'>A clear photo of your face</p>
                      <p className='text-[10px] text-primary mt-2 font-medium'>Tap to upload</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className='font-bold lg:text-2xl md:text-xl text-base pt-[30px] md:pt-10'>
              Choose payment Method
            </h2>
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              className='mt-5 md:mt-7 max-[380px]:grid-cols-1 grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(14rem,280px))] gap-4'>
              {paymentService.map((item, index) => (
                <Label
                  key={index}
                  htmlFor={`payment-${index}`}
                  className={`flex-1 h-full border rounded-[12px] p-4 md:p-6 space-y-3 cursor-pointer transition-all duration-200 ${
                    selectedPayment === item.name
                      ? 'border-primary bg-primary/5'
                      : 'border-[#E2E6EE] hover:border-primary/50'
                  }`}>
                  <div className='flex items-center gap-4'>
                    <RadioGroupItem
                      value={item.name}
                      id={`payment-${index}`}
                      className='mt-1'
                    />

                    <h4 className='text-sm md:text-base font-bold'>
                      {item.name}
                    </h4>
                    <div className='hidden md:block'>{item.icon}</div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className='flex flex-col items-center mt-7 md:mt-10 px-4 gap-2'>
            {(!idFile || !selfieFile) && (
              <p className='text-xs text-amber-600 font-medium'>
                Upload your ID and selfie above to continue
              </p>
            )}
            <Button
              onClick={handlePayment}
              disabled={!idFile || !selfieFile}
              className='md:text-xl text-xs font-semibold w-full lg:h-[70px] md:h-[50px] h-10 max-w-[540px] disabled:opacity-50 disabled:cursor-not-allowed'>
              Proceed to payment
            </Button>
          </div>
          <BankTransferModal
            open={showSuccessModal}
            amount={
              cards?.cards
                ?.map((card) => +card.card_amount.split(',').join(''))
                .reduce((a, b) => a + b, 0) ?? 0
            }
            payingThroughBank={payingThroughBank}
            onOpenChange={setShowSuccessModal}
            error={''}
            details={
              bankData?.payment_details?.data?.data?.account_details
                ? {
                    bank_name:
                      bankData.payment_details.data.data.account_details
                        .bank_name,
                    account_name:
                      bankData.payment_details.data.data.account_details
                        .account_name,
                    account_number:
                      bankData.payment_details.data.data.account_details
                        .account_number,
                    request_reference:
                      bankData.payment_details.data.data.account_details
                        .request_reference,
                  }
                : null
            }
          />
          ;
        </>
      )}
    </div>
  );
}

export default OrderSummary;
