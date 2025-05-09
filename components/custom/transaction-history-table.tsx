import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import PreviousChevronLeftIcon from '../icon/previous-chevron-left-icon';
import NextChevronRightIcon from '../icon/next-chevron-right-icon';

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
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  prefetchQuery,
  next,
  showAction,
  action,
}: {
  data?: {
    [key: string]: string;
  }[];
  header?: {
    key: string;
    title: string;
  }[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  prefetchQuery: () => void;
  next?: boolean;
  showAction?: boolean;
  action?: () => void;
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
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

                {showAction && (
                  <th className='py-6 px-4 text-left font-medium'>Action</th>
                )}
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className='border-b hover:bg-gray-50 font-dm-sans'>
                  <th className='py-4 px-4'>
                    <Checkbox
                      className='z-999 relative cursor-pointer'
                      checked={selectedRows.includes(index)}
                      onCheckedChange={() => handleCheckboxChange(index)}
                      aria-label={`Select row ${index + 1}`}
                    />
                  </th>

                  <td className='py-4 px-4 text-sm font-semibold'>
                    {index + 1}
                  </td>

                  {header?.map((headerItem, headerIndex) => (
                    <td key={headerIndex} className='py-[36px] px-4 text-sm'>
                      {item[headerItem.key]}
                    </td>
                  ))}

                  {showAction && (
                    <td className='py-4 px-4 text-sm'>
                      <Button
                        onClick={action}
                        className='bg-[#990099] text-white rounded-md px-4 py-2'>
                        Action
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.map((data, index) => (
          <div key={index} className='block md:hidden mt-4'>
            <div className='bg-white rounded-lg p-4 text-sm space-y-5 border'>
              {Object.entries(data).map(([key, value], index) => (
                <p
                  key={index}
                  className='flex justify-between font-dm-sans gap-1 text-xs'>
                  <span className='font-medium capitalize font-dm-sans'>
                    {key.replace(/_/g, ' ')}:
                  </span>{' '}
                  {value}
                </p>
              ))}
            </div>
          </div>
        ))}
        {/* Pagination Controls */}
        <div className='flex justify-between items-center mt-6 mb-6'>
          <Button
            onClick={onPreviousPage}
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
            Page {currentPage} of {totalPages}
          </p>
          <Button
            onClick={onNextPage}
            onMouseEnter={() => {
              if (next) {
                prefetchQuery();
              }
            }}
            disabled={!next}
            className={`h-10 px-4 text-sm font-medium font-dm-sans ${
              !next
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}>
            Next <NextChevronRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TransactionHistoryTable;
