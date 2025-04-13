function RequestFundPage() {
  return (
    <div>
      <div className='px-4 pt-6'>
        <h2 className='text-base md:hidden font-semibold'>Request Funds</h2>
        <div className='md:mt-7 mt-5 border-t-[2px] border-[#F6F3FB] md:px-6 px-4 md:py-10 py-5'>
          <div className='container mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:gap-12 gap-4 max-w-[1100px]'>
            <Card asChild bgUrl='/assets/wallet-card-bg.png'>
              <p>Hi</p>
            </Card>
            <Card title='Request Funds' value='Total Redeemed card balance' />
            <Card title='Request Funds' value='Pending balance' />
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
  bgUrl,
  children,
}: {
  title?: string;
  value?: string;
  asChild?: boolean;
  bgUrl?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`bg-[url(${bgUrl})]`}>
      {asChild ? (
        children
      ) : (
        <div className='bg-[#F6F3FB] h-[130px] rounded-[12px] flex flex-row items-center gap-5 px-7 sm:p-6'>
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
