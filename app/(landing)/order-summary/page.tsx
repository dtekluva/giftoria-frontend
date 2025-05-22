'use client';
import Clipboard from '@/components/custom/clipboard';
import FilterSearchIcon from '@/components/icon/filter-search-icon';
import OutlineEditIcon from '@/components/icon/outline-edit-icon';
import TrashOutlineIcon from '@/components/icon/trash-outline-icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'; // Adjust import path as needed
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BuyMultipleCard } from '@/libs/types/brand.types';
import { useByAllCardsMutation } from '@/services/mutations/brand.mutation';
import { getCookie } from 'cookies-next/client';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const paymentService = [
  {
    name: 'Paystack',
    image: 'https://placehold.co/225x120.png',
    description: '',
    type: 'paystack',
  },
  {
    name: 'Bank Transfer',
    image: '', // You can add an image if you want
    description:
      'Use the account number displayed below to transfer funds to your wallet',
    type: 'transfer',
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

  return (
    <div className='container mx-auto p-4 mt-2 md:mt-8'>
      <div className='lg:flex justify-between items-center'>
        <h1 className='md:text-2xl font-bold text-base'>Order Summary</h1>
        <div className='p-3 pl-3 px-5 border rounded-[12px] border-[#E2E6EE] flex gap-2 items-center max-w-[90%] mx-auto mt-4 lg:mt-0 lg:max-w-[290px] lg:mx-0'>
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
        </div>
      </div>
      <ul className='mt-4 md:mt-6 space-y-4'>
        {cards?.cards?.map((card, index) => (
          <li
            key={index}
            className='lg:flex items-center justify-between space-y-4 lg:space-y-0 gap-4 pb-6 border-b'>
            <div className='flex items-center gap-4 font-montserrat'>
              <Image
                src={'https://placehold.co/160x100.png'}
                width={160}
                height={100}
                alt=''
              />
              <div className='space-y-2 md:space-y-3'>
                <p className='text-sm font-medium'>₦{card.card_amount}</p>
                <p className='text-xs font-dm-sans'>{card.recipient_name}</p>
                <p className='md:text-sm text-[10px] xl:hidden block'>
                  {card.recipient_email}
                </p>
                <div className='flex items-center'>
                  <OutlineEditIcon className='cursor-pointer' />
                  <button
                    className='cursor-pointer'
                    onClick={() => handleDelete(index)}>
                    <TrashOutlineIcon className='cursor-pointer ml-4' />
                  </button>
                </div>
              </div>
              <p className='md:text-sm text-[10px] hidden xl:block ml-auto'>
                {card.recipient_email}
              </p>
            </div>
            <div className='flex items-center md:gap-[157px] justify-between md:justify-normal'>
              <div className='px-3 md:py-5  py-3 bg-[#F6F3FB] rounded-[10px] max-w-[440px] flex-1'>
                <article className='text-[6px] md:text-[10px]'>
                  {card.message}
                </article>
              </div>
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
          <div>
            <h2 className='font-bold lg:text-2xl md:text-xl text-base pt-[30px] md:pt-10'>
              Choose payment Method
            </h2>
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              className='mt-5 md:mt-7 max-[380px]:grid-cols-1 grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(14rem,270px))] gap-4'>
              {paymentService.map((item, index) => (
                <Label
                  key={index}
                  htmlFor={`payment-${index}`}
                  className='flex-1 h-full border border-[#E2E6EE] rounded-[12px] p-2 md:p-6  md:space-y-5 space-y-3 cursor-pointer'>
                  <div className=''>
                    <div className='flex items-start gap-4'>
                      <RadioGroupItem
                        value={item.name}
                        id={`payment-${index}`}
                      />
                      <h4 className='text-sm md:text-base font-bold'>
                        {item.name}
                      </h4>
                    </div>
                    {item.image && (
                      <div className='flex items-center space-x-4'>
                        <Image
                          src={item.image}
                          width={225}
                          height={120}
                          alt={item.name}
                        />
                      </div>
                    )}
                    {item.type === 'transfer' && (
                      <div>
                        <p className='mt-1 md:mt-[6px] font-dm-sans text-[8px] md:text-xs text-[#4E4E4E]'>
                          {item.description}
                        </p>
                        <div className='mt-3 md:mt-5 md:space-y-3 space-y-2'>
                          <div className='flex items-center gap-4 justify-between'>
                            <p className='text-xs font-montserrat'>
                              Bank name:
                            </p>
                            <p className='text-[10px] md:text-sm font-bold font-dm-sans text-[#556575]'>
                              Providus Bank
                            </p>
                          </div>
                          <Clipboard
                            title='Account number:'
                            value='9131200194'
                          />
                          <div className='flex items-center gap-4 justify-between'>
                            <p className='text-xs font-montserrat'>
                              Account name:
                            </p>
                            <p className='text-[10px] md:text-sm font-bold font-dm-sans text-[#556575]'>
                              Giftoria
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className='flex justify-center mt-7 md:mt-10 px-4'>
            <Button
              onClick={handlePayment}
              className='md:text-xl text-xs font-semibold w-full lg:h-[70px] md:h-[50px] h-10 max-w-[540px]'>
              Proceed to payment
            </Button>
          </div>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bank Transfer Details</DialogTitle>
              </DialogHeader>
              <div className='py-4 text-center'>
                {payingThroughBank ? (
                  // Skeleton loader
                  <div className='space-y-4'>
                    <div className='h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse' />
                    <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
                    <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
                    <div className='h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
                  </div>
                ) : bankData?.payment_details?.data?.data?.account_details ? (
                  // Show actual bank details
                  <div className='space-y-3'>
                    <p className='text-lg font-semibold mb-2'>
                      Please transfer to the account below:
                    </p>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>Bank Name:</span>
                      <span className='font-bold'>
                        {
                          bankData.payment_details.data.data.account_details
                            .bank_name
                        }
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>Account Name:</span>
                      <span className='font-bold'>
                        {
                          bankData.payment_details.data.data.account_details
                            .account_name
                        }
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>Account Number:</span>
                      <Clipboard
                        title=''
                        value={
                          bankData.payment_details.data.data.account_details
                            .account_number
                        }
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>Reference:</span>
                      <span className='font-bold'>
                        {
                          bankData.payment_details.data.data.account_details
                            .request_reference
                        }
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className='text-red-500'>Unable to fetch bank details.</p>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setShowSuccessModal(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
