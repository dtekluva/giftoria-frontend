interface OrderHistoryTableProps {
  headers: { key: string; label: string }[];
  data: {
    transaction_id: string;
    card_number: string;
    amount: string;
    card_value: string;
    balance: string;
    status: React.ReactNode;
    store_address: string;
    created_at: string;
  }[];
  emptyStateMessage?: string;
}

const OrderHistoryTable = ({
  headers,
  data,
  emptyStateMessage = 'No order history available',
}: OrderHistoryTableProps) => {
  const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-12 px-4 font-dm-sans'>
      <div className='w-24 h-24 mb-6'>
        <svg
          className='w-full h-full text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          />
        </svg>
      </div>
      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
        No Orders Found
      </h3>
      <p className='text-gray-500 text-center'>{emptyStateMessage}</p>
    </div>
  );

  if (data?.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className='container mx-auto px-4 pt-4 md:pt-9'>
        <div className='overflow-x-auto hidden md:block'>
          <table className='min-w-full bg-white shadow-md rounded-lg text-sm'>
            <thead className='border-y'>
              <tr className='font-montserrat'>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className='py-6 px-4 text-left font-medium'>
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className='border-b hover:bg-gray-50 font-dm-sans'>
                  {headers.map((header) => (
                    <td key={header.key} className='py-[36px] px-4'>
                      {item[header.key as keyof typeof item]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.map((item, index) => (
          <div key={index} className='block md:hidden mt-4'>
            <div className='bg-white rounded-lg p-4 text-sm space-y-5 border'>
              {headers.map((header) => (
                <p
                  key={header.key}
                  className='flex justify-between font-dm-sans gap-1 text-xs'>
                  <span className='font-medium font-sans'>{header.label}:</span>{' '}
                  {item[header.key as keyof typeof item]}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistoryTable;
