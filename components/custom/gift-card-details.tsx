import React from 'react';

interface GiftCardDetails {
  [key: string]: string | number; // Define the shape of the details object
}

function GiftCardDetailsTable({ data }: { data: GiftCardDetails }) {
  return (
    <div className='rounded-md flex-1'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <tbody className='divide-y divide-gray-200 font-dm-sans'>
            {Object.entries(data).map(([title, value]) => (
              <tr key={title}>
                <th
                  scope='row'
                  className='px-6 py-3 text-left text-sm font-normal text-[#556575]'>
                  {title
                    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
                    .replace(/^./, (str) => str.toUpperCase())}{' '}
                  {/* Capitalize first letter */}
                </th>
                <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-900 text-right md:text-left'>
                  {title.toLowerCase() === 'status' ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        value === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {value}
                    </span>
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GiftCardDetailsTable;
