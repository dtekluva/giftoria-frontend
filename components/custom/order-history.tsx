const historyData = [
  {
    dateTime: '2/10/2023 - 4:30PM',
    orderNo: 'GFT - XYZ123456',
    storeAddress: 'No. 5 Shomolu, Obanikoro, Lagos',
    totalValue: '₦400,000.00',
    redeemed: '₦400,000.00',
    balance: '₦10,000',
  },
  {
    dateTime: '2/10/2023 - 4:30PM',
    orderNo: 'GFT - XYZ123456',
    storeAddress: 'No. 5 Shomolu, Obanikoro, Lagos',
    totalValue: '₦400,000.00',
    redeemed: '₦400,000.00',
    balance: '₦10,000',
  },
  // ...add more if needed
];

const OrderHistoryTable = () => {
  return (
    <>
      <div className='container mx-auto px-4 pt-4 md:pt-9'>
        <div className='overflow-x-auto hidden md:block'>
          <table className='min-w-full bg-white shadow-md rounded-lg text-sm'>
            <thead className='border-y'>
              <tr className='font-montserrat'>
                <th className='py-6 px-4 text-left font-medium'>Id</th>
                <th className='py-6 px-4 text-left font-medium'>Date/Time</th>
                <th className='py-6 px-4 text-left font-medium'>Order No.</th>
                <th className='py-6 px-4 text-left font-medium'>
                  Store Address
                </th>
                <th className='py-6 px-4 text-left font-medium'>Total Value</th>
                <th className='py-6 px-4 text-left font-medium'>Redeemed</th>
                <th className='py-6 px-4 text-left font-medium'>Balance</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {historyData.map((item, index) => (
                <tr
                  key={index}
                  className='border-b hover:bg-gray-50 font-dm-sans'>
                  <td className='py-[36px] px-4'>{index + 1}</td>
                  <td className='py-[36px] px-4'>{item.dateTime}</td>
                  <td className='py-[36px] px-4'>{item.orderNo}</td>
                  <td className='py-[36px] px-4'>{item.storeAddress}</td>
                  <td className='py-[36px] px-4'>{item.totalValue}</td>
                  <td className='py-[36px] px-4'>{item.redeemed}</td>
                  <td className='py-[36px] px-4'>{item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className='block md:hidden space-y-4'>
        <div className='bg-white rounded-lg shadow-md p-4 text-sm'>
          <p>
            <span className='font-medium'>Date/Time:</span> 2/10/2023 - 4:30PM
          </p>
          <p>
            <span className='font-medium'>Order No.:</span> GFT - XYZ123456
          </p>
          <p>
            <span className='font-medium'>Store Address:</span> No. 5 Shomolu,
            Obanikoro, Lagos
          </p>
          <p>
            <span className='font-medium'>Total Value:</span> ₦400,000.00
          </p>
          <p>
            <span className='font-medium'>Redeemed:</span> ₦400,000.00
          </p>
          <p>
            <span className='font-medium'>Balance:</span> ₦10,000
          </p>
        </div>
      </div> */}

        {historyData.map((data, index) => (
          <div key={index} className='block md:hidden mt-4'>
            <div className='bg-white rounded-lg p-4 text-sm space-y-5 border'>
              <p className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-medium font-sans'>Date/Time:</span>{' '}
                2/10/2023 - 4:30PM
              </p>
              <p className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-medium font-sans'>Order No.:</span> GFT -
                XYZ123456
              </p>
              <p className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-medium font-sans'>Store Address:</span>{' '}
                No. 5 Shomolu, Obanikoro, Lagos
              </p>
              <p className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-medium font-sans'>Total Value:</span>{' '}
                ₦400,000.00
              </p>
              <p className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-medium font-sans'>Redeemed:</span>{' '}
                ₦400,000.00
              </p>
              <p className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-medium font-sans'>Balance:</span> ₦10,000
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistoryTable;
