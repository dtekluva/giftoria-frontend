import React from 'react';
import SearchIcon from '../icon/search-icon';
import FilterSearchIcon from '../icon/filter-search-icon';

interface SearchInputProps {
  value?: string; // Optional value prop
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
  placeholder?: string; // Optional placeholder prop
  className?: string; // Optional className prop
}

function SearchInput({
  value,
  onChange,
  placeholder = 'Search',
  className,
}: SearchInputProps) {
  return (
    <div
      className={
        'p-3 pl-3 px-5 border rounded-[12px] border-[#E2E6EE] flex gap-2 items-center lg:mx-0' +
        className
      }>
      <div>
        <SearchIcon />
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='border-0 focus:border-0 focus:outline-none text-sm focus:ring-0 flex-1'
      />
      <div className='pl-4 border-l border-[#93A3C0]'>
        <FilterSearchIcon />
      </div>
    </div>
  );
}

export default SearchInput;
