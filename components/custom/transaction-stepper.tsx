import {
  Stepper,
  StepperContextValue,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper';
import TransactionEnvelopeIcon from '../icon/transaction-envelope-icon';
import TransactionPendingIcon from '../icon/transaction-pending-icon';
import TransactionStepperRedeemedIcon from '../icon/transaction-stepper-redeemed';
import { CardSale } from '@/libs/types/brand.types';
import { formatCustomDate } from '@/utils/dateFormat';

function TransactionStepper(
  props: Partial<StepperContextValue> & {
    data?: CardSale;
  }
) {
  return (
    <div className='mx-auto max-w-xl space-y-8 text-center min-w-[300px]'>
      <Stepper orientation='horizontal' defaultValue={props?.activeStep || 2}>
        <StepperItem disabled step={1} className='[&:not(:last-child)]:flex-1'>
          <StepperTrigger>
            <StepperIndicator asChild className='md:flex-col gap-3 md:gap-1.5'>
              <TransactionEnvelopeIcon />
              <div>
                <p className='text-[10px] font-medium md:text-xs text-[#259C80]'>
                  Sent
                </p>
                <p className='text-[8px] md:text-xs text-[#4A4A68]'>
                  {formatCustomDate(props.data?.sent_date ?? '')}
                </p>
              </div>
            </StepperIndicator>
          </StepperTrigger>
          <StepperSeparator className='md:-mt-8 -ml-[82px] md:-ml-0' />
        </StepperItem>
        <StepperItem
          disabled
          step={2}
          className='[&:not(:last-child)]:flex-1 -ml-8 md:-ml-0'>
          <StepperTrigger>
            <StepperIndicator asChild className='md:flex-col gap-3 md:gap-1.5'>
              <TransactionPendingIcon />
              <div>
                <p className='text-[10px] font-medium md:text-xs text-[#FCAC33]'>
                  Pending{' '}
                </p>
                {/* <p className='text-[8px] md:text-xs text-[#4A4A68]'>
                  {formatCustomDate(props.data?.assigned_date ?? '')}
                </p> */}
              </div>
            </StepperIndicator>
          </StepperTrigger>
          <StepperSeparator className='md:-mt-8 -ml-[82px] md:-ml-0' />
        </StepperItem>
        <StepperItem disabled step={3} className='[&:not(:last-child)]:flex-1'>
          <StepperTrigger>
            <StepperIndicator asChild className='md:flex-col gap-3 md:gap-1.5'>
              <TransactionStepperRedeemedIcon />
              <div>
                <p className='text-[10px] font-medium md:text-xs text-[#D6D6D6]'>
                  Redeemed
                </p>
                <p className='text-[8px] md:text-xs text-[#4A4A68]'>
                  {props.data?.redeemed_date
                    ? formatCustomDate(props.data?.redeemed_date ?? '')
                    : 'Not redeemed'}
                </p>
              </div>
            </StepperIndicator>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
    </div>
  );
}

export { TransactionStepper };
