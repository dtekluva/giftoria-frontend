import React, { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

interface TableProps<T> {
  headers: string[]; // Array of header titles
  data: T[]; // Array of data objects
  selectable?: boolean; // Optional prop to enable row selection
}

const Table = <T extends Record<string, unknown>>({
  headers,
  data,
  selectable = false,
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

  return (
    <div className='overflow-x-auto'>
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
              <th key={index} className='py-6 px-4 text-left font-medium'>
                {header}
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
                <td key={colIndex} className='py-[36px] px-4'>
                  {String(row[header] || '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
