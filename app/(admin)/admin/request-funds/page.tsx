function RequestFundPage() {
  return (
    <div>
      <div className='px-4 pt-6'>
        <h2 className='text-base md:hidden font-semibold'>Request Funds</h2>
        <div className='md:mt-7 mt-5 border-t-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-10 py-5'>
          <div className='container  max-w-[1100px]'>
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
