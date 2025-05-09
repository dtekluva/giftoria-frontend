import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

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

const TransactionHistoryTable = ({
  data = historyData,
  header,
}: {
  data?: {
    [key: string]: string;
  }[];
  header?: {
    key: string;
    title: string;
  }[];
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  console.log(header);

  const handleCheckboxChange = (index: number) => {
    console.log(index, 'this is the index');
    setSelectedRows(
      (prevSelectedRows) =>
        prevSelectedRows.includes(index)
          ? prevSelectedRows.filter((row) => row !== index) // Uncheck
          : [...prevSelectedRows, index] // Check
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]); // Uncheck all
    } else {
      setSelectedRows(data.map((_, index) => index)); // Check all
    }
  };

  return (
    <>
      <div className='container mx-auto px-4 pt-4 md:pt-9'>
        <div className='overflow-x-auto hidden md:block'>
          <table className='min-w-full bg-white shadow-md rounded-lg text-sm'>
            <thead className='border-y'>
              <tr className='font-montserrat'>
                <th className='py-4 px-4'>
                  <Checkbox
                    checked={selectedRows.length === data.length}
                    onCheckedChange={handleSelectAll}
                    className='z-999 relative cursor-pointer'
                    aria-label='Select all rows'
                  />
                </th>

                <th className='py-6 px-4 text-left font-medium'>S/N</th>

                {header?.map((item, index) => (
                  <th key={index} className='py-6 px-4 text-left font-medium'>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className='border-b hover:bg-gray-50 font-dm-sans'>
                  <th className='py-4 px-4'>
                    <Checkbox
                      className='z-999 relative cursor-pointer font-semibold'
                      checked={selectedRows.includes(index)}
                      onCheckedChange={() => handleCheckboxChange(index)}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </th>

                  <td className='py-4 px-4 text-sm font-semibold'>
                    {index + 1}
                  </td>

                  {header?.map((headerItem, headerIndex) => (
                    <td
                      key={headerIndex}
                      className='py-[36px] px-4 text-sm font-semibold'>
                      {item[headerItem.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

export default TransactionHistoryTable;
