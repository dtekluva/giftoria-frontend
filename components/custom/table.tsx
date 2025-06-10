'use client';
import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

interface TableProps<T> {
  headers: { key: string; title: string }[]; // Array of header objects with key and title
  data: T[]; // Array of data objects
  selectable?: boolean; // Optional prop to enable row selection
  emptyStateMessage?: string; // Optional custom message for empty state
}

const Table = <T extends Record<string, unknown>>({
  headers,
  data,
  selectable = false,
  emptyStateMessage = 'No data available',
}: TableProps<T>) => {
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

  const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-12 px-4'>
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
        No Data Found
      </h3>
      <p className='text-gray-500 text-center'>{emptyStateMessage}</p>
    </div>
  );

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='container mx-auto px-4 pt-4 md:pt-9'>
      {/* Desktop Table */}
      <div className='overflow-x-auto hidden md:block'>
        <table className='min-w-full bg-white shadow-md rounded-lg text-sm'>
          <thead className='border-y'>
            <tr className='font-montserrat'>
              {selectable && (
                <th className='py-4 px-4'>
                  <Checkbox
                    checked={selectedRows.length === data.length}
                    onCheckedChange={handleSelectAll}
                    aria-label='Select all rows'
                  />
                </th>
              )}
              {headers.map((header, index) => (
                <th
                  key={index}
                  className='py-6 px-4 text-left font-semibold text-xs'>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b hover:bg-gray-50 font-dm-sans ${
                  selectedRows.includes(rowIndex) ? 'bg-gray-100' : ''
                }`}>
                {selectable && (
                  <th className='py-4 px-4'>
                    <Checkbox
                      checked={selectedRows.includes(rowIndex)}
                      onCheckedChange={() => handleCheckboxChange(rowIndex)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </th>
                )}
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className='py-[36px] px-4  text-xs'>
                    <span className='line-clamp-1'>
                      {String(row[header.key] || '-')}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className='block md:hidden mt-4'>
          <div className='bg-white rounded-lg p-4 text-sm space-y-5 border'>
            {headers.map((header, colIndex) => (
              <p
                key={colIndex}
                className='flex justify-between font-dm-sans gap-1 text-xs'>
                <span className='font-bold text-xs font-sans'>
                  {header.title}:
                </span>
                {String(row[header.key] || '-')}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
