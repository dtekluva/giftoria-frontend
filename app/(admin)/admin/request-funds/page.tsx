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
import { useGetPayoutTransactionsQuery } from '@/services/queries/brand.queries';
import { useState, useCallback } from 'react';
import NextChevronRightIcon from '@/components/icon/next-chevron-right-icon';
import PreviousChevronLeftIcon from '@/components/icon/previous-chevron-left-icon';
import { useDebounce } from '@/hooks/use-debounce';
import { CompanyPayOutTransaction } from '@/libs/types/brand.types';
import BulkMoneyIcon from '@/components/icon/bulk-money-icon';
import OutlineEyeIcon from '@/components/icon/outline-eye-icon';

import { useGetCompanyDashboardQuery } from '@/services/queries/company.queries';
import { EyeClosedIcon } from 'lucide-react';

const REQUEST_FUNDS_PAGE_SIZE = 10;

const headers = [
  { key: 'transaction_reference', title: 'Transaction Reference' },
  { key: 'amount', title: 'Amount' },
  { key: 'total_amount', title: 'Total Amount' },
  { key: 'charges', title: 'Charges' },
  { key: 'status', title: 'Status' },
  { key: 'account_name', title: 'Account Name' },
  { key: 'bank_name', title: 'Bank Name' },
  { key: 'account_number', title: 'Account Number' },
  { key: 'created_at', title: 'Created At' },
];

function RequestFundPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { query: companyQuery } = useGetCompanyDashboardQuery();

  const { query, prefetchQuery } = useGetPayoutTransactionsQuery({
    search: debouncedSearch,
    page: currentPage,
    page_size: REQUEST_FUNDS_PAGE_SIZE,
  });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Transform the data to match the table's expected type
  const tableData =
    query.data?.results.map((transaction: CompanyPayOutTransaction) => ({
      ...transaction,
      amount: `₦${transaction.amount.toLocaleString()}`,
      total_amount: `₦${transaction.total_amount.toLocaleString()}`,
      charges: `₦${transaction.charges.toLocaleString()}`,
      created_at: new Date(transaction.created_at).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    })) || [];

  return (
    <div>
      <div className='md:px-6'>
        <h2 className='text-base md:hidden px-4 py-4 font-semibold'>
          Request Funds
        </h2>

        <div className='border-y-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-10 py-5'>
          <div className='container max-w-[1100px]'>
            <div className='container max-w-[700px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch lg:gap-6 gap-4'>
              {companyQuery.isPending ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                <>
                  <Card
                    asChild
                    className='bg-[url(/assets/wallet-card-bg.png)] bg-cover bg-no-repeat rounded-[6px] py-3 px-4 flex items-center justify-between'>
                    <div>
                      <h3 className='md:text-sm text-xs font-medium font-dm-sans text-white'>
                        Account Balance
                      </h3>
                      <p className='md:text-2xl text-white text-xl font-semibold'>
                        ₦{companyQuery.data?.balance?.toLocaleString()}
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
                  <TotalSalesCard balance={companyQuery.data?.balance || 0} />
                </>
              )}
            </div>
          </div>
        </div>
        <div className='container grid lg:flex gap-5 lg:items-center lg:justify-between pt-4 md:px-6 px-4'>
          <h1 className='md:text-xl text-base font-semibold'>
            Request Funds History
          </h1>
          <div className='md:flex items-center md:gap-5'>
            <SearchInput
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder='Search by reference, account name, or bank name'
              className='md:max-w-fit md:mx-auto'
            />
            <Button className='md:h-16 col-span-full ml-auto md:px-10 px-6 h-10 row-1 max-w-fit md:text-base text-sm font-albert-sans font-semibold mt-5 md:mt-0'>
              Request Funds
            </Button>
          </div>
        </div>
        <div>
          {query.isPending ? (
            <div className='animate-pulse'>
              <div className='h-10 bg-gray-200 rounded mb-4'></div>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className='h-16 bg-gray-100 rounded mb-2'></div>
              ))}
            </div>
          ) : (
            <Table headers={headers} data={tableData} selectable={true} />
          )}
        </div>

        {/* Pagination Controls */}
        {query.data && (
          <div className='flex justify-between items-center mt-6 px-6'>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`h-10 px-4 text-sm font-medium font-dm-sans ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
              }`}>
              <PreviousChevronLeftIcon />
              Previous
            </Button>
            <p className='text-sm text-gray-600'>
              Page {query.data?.count === 0 ? 0 : currentPage} of{' '}
              {Math.ceil(query.data.count / REQUEST_FUNDS_PAGE_SIZE)}
            </p>
            <Button
              onClick={handleNextPage}
              onMouseEnter={() => {
                if (query.data.next) {
                  prefetchQuery();
                }
              }}
              disabled={!query.data.next}
              className={`h-10 px-4 text-sm font-medium font-dm-sans ${
                !query.data.next
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
              }`}>
              Next <NextChevronRightIcon />
            </Button>
          </div>
        )}
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
    <div className='px-7 py-10 md:px-0 md:py-1'>
      <h2 className='font-semibold text-base md:text-2xl font-sans'>
        Request Withdrawal
      </h2>
      <p className='text-xs md:text-base text-[#4A4A68] font-dm-sans border-b pb-4'>
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

function CardSkeleton() {
  return (
    <div className='animate-pulse bg-gray-100 rounded-[6px] py-3 px-4 flex items-center justify-between min-h-[130px]'>
      <div className='space-y-3'>
        <div className='h-4 w-24 bg-gray-200 rounded'></div>
        <div className='h-8 w-32 bg-gray-200 rounded'></div>
      </div>
      <div className='space-y-3'>
        <div className='h-6 w-20 bg-gray-200 rounded'></div>
        <div className='h-4 w-24 bg-gray-200 rounded'></div>
      </div>
    </div>
  );
}

function TotalSalesCard({ balance }: { balance: number }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <Card
      asChild
      className='bg-[url(/assets/balance-card-bg.png)] font-sora bg-cover bg-no-repeat rounded-[6px] py-3 px-4 flex items-center justify-between'>
      <div className='text-[#292D32]'>
        <h3 className='md:text-sm font-nunito text-xs font-medium'>
          Total Sales
        </h3>
        <p className='md:text-2xl text-[#032282] text-xl font-bold'>
          {isBalanceVisible ? `₦${balance.toLocaleString()}` : '****'}
        </p>
        <p className='md:text-sm text-xs font-medium font-nunito'>Balance</p>
      </div>
      <div className='self-start flex flex-col items-center'>
        <div className='p-2 bg-white rounded-full mb-7'>
          <BulkMoneyIcon />
        </div>
        <button
          onClick={() => setIsBalanceVisible(!isBalanceVisible)}
          className='cursor-pointer hover:opacity-80 transition-opacity'>
          {isBalanceVisible ? <OutlineEyeIcon /> : <EyeClosedIcon />}
        </button>
      </div>
    </Card>
  );
}

export default RequestFundPage;
