'use client';
import SearchInput from '@/components/custom/search-input';
import Table from '@/components/custom/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useRequestWithdrawal } from '@/services/mutations/brand.mutation';

const historyData = [
  {
    id: 1,
    dateTime: '2/10/2023 - 4:30PM',
    desc: 'January/2025 payment',
    amount: 'No. 5 Shomolu, Obanikoro, Lagos',
    walletId: '182563802142',
    sessionCode: 'R2GDRRS2232',
    status: 'Success',
  },
];

const headers = [
  { key: 'id', title: 'Id' },
  { key: 'dateTime', title: 'Date/Time' },
  { key: 'desc', title: 'Description' },
  { key: 'amount', title: 'Amount' },
  { key: 'walletId', title: 'Wallet ID' },
  { key: 'sessionCode', title: 'Session code' },
  { key: 'status', title: 'Status' },
];

function RequestFundPage() {
  return (
    <div>
      <div className='md:px-6'>
        <h2 className='text-base md:hidden px-4 py-4 font-semibold'>
          Request Funds
        </h2>

        <div className='border-y-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-10 py-5'>
          <div className='container max-w-[1100px]'>
            <div className='container max-w-[700px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch lg:gap-6 gap-4'>
              <Card
                asChild
                className='bg-[url(/assets/wallet-card-bg.png)] bg-cover bg-no-repeat rounded-[6px] py-3 px-4 flex items-center justify-between'>
                <div>
                  <h3 className='md:text-sm text-xs font-medium font-dm-sans text-white'>
                    Account Balance
                  </h3>
                  <p className='md:text-2xl text-white text-xl font-semibold'>
                    ₦50,000,000
                  </p>
                </div>
                <div className='self-stretch flex flex-col justify-between gap-[58px]'>
                  <Dialog>
                    <DialogTrigger asChild className='hidden md:block'>
                      <button className='text-white font-dm-sans text-[10px] py-2 px-3 border rounded-sm font-medium'>
                        Request payout
                      </button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[620px] overflow-y-auto max-h-[90%]'>
                      <RequestWithdrawalForm />
                    </DialogContent>
                  </Dialog>
                  <Sheet>
                    <SheetTrigger asChild className='md:hidden'>
                      <button className='text-white font-dm-sans text-[10px] py-2 px-3 border rounded-sm font-medium'>
                        Request payout
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      className='max-h-full overflow-y-auto'
                      side='bottom'>
                      <RequestWithdrawalForm />
                    </SheetContent>
                  </Sheet>
                  <p className='text-white'>182563802142</p>
                </div>
              </Card>
              <Card title='₦19,000,000' value='Total Redeemed card balance' />
              {/* <Card title='₦19,000,000' value='Pending balance' /> */}
            </div>
          </div>
        </div>
        <div className='container grid lg:flex gap-5 lg:items-center lg:justify-between py-4 md:px-6 px-4'>
          <h1 className='md:text-xl text-base font-semibold'>
            Request Funds History
          </h1>
          <SearchInput className='md:max-w-fit md:mx-auto' />
          <Button className='md:h-16 col-span-full ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans font-semibold mt-5 md:mt-0'>
            Request Funds
          </Button>
        </div>
        <div>
          <Table headers={headers} data={historyData} selectable={true} />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  asChild,
  className,
  children,
}: {
  title?: string;
  value?: string;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      {asChild ? (
        children
      ) : (
        <div className='bg-[#F6F3FB] h-[130px] rounded-[12px] flex flex-row items-center min-h-full gap-5 px-7 sm:p-6'>
          <div className='h-10  w-10 rounded-full bg-white' />
          <div>
            <h1 className='text-lg font-semibold text-[#032282]'>{title}</h1>
            <p className='text-sm font-dm-sans text-[#818181] mt-1'>{value}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RequestWithdrawalForm() {
  const { form, isLoading, onSubmit } = useRequestWithdrawal();

  return (
    <div className='px-7 py-10 md:px-0 md:py-1 font-dm-sans'>
      <h2 className='font-semibold text-base md:text-2xl'>
        Request Withdrawal
      </h2>
      <p className='text-xs md:text-base text-[#4A4A68] border-b pb-4'>
        Fill the details below to make request
      </p>
      <div>
        <p className='text-primary my-3 font-dm-sans text-xs'>
          Remember Account
        </p>
      </div>
      <div className='md:mt-[30px] mt-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:space-y-7 space-y-4 font-dm-sans'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='account_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter account number'
                        className='h-12'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bank_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter bank name'
                        className='h-12'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='account_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter account name'
                        className='h-12'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bank_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter bank code'
                        className='h-12'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter amount'
                        className='h-12'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        className='h-12'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='narration'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Narration (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter narration'
                      className='min-h-[100px] resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full h-12 font-semibold'
              disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Request Withdrawal'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default RequestFundPage;
