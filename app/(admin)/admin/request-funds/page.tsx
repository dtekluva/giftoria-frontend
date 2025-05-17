import SearchInput from '@/components/custom/search-input';
import Table from '@/components/custom/table';
import { Button } from '@/components/ui/button';

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
            <div className='container max-w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch lg:gap-12 gap-4'>
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
                  <button className='text-white font-dm-sans text-[10px] py-2 px-3 border rounded-sm font-medium'>
                    Request payout
                  </button>
                  <p className='text-white'>182563802142</p>
                </div>
              </Card>
              <Card title='₦19,000,000' value='Total Redeemed card balance' />
              <Card title='₦19,000,000' value='Pending balance' />
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

export default RequestFundPage;
