import React, { useCallback, useEffect, useState } from 'react';
import SearchIcon from '../icon/search-icon';

interface SearchInputProps {
  value?: string; // Optional value prop
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
  onDebouncedChange?: (value: string) => void;
  placeholder?: string; // Optional placeholder prop
  className?: string; // Optional className prop
  debounceDelay?: number;
}

function SearchInput({
  value,
  onChange,
  onDebouncedChange,
  placeholder = 'Search',
  className = '',
  debounceDelay = 500,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (!onDebouncedChange) return;

    const timer = setTimeout(() => {
      onDebouncedChange(inputValue);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [inputValue, debounceDelay, onDebouncedChange]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInputValue(newValue);
      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

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
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className='border-0 focus:border-0 focus:outline-none text-sm focus:ring-0 flex-1'
      />
      {/* <div className='pl-4 border-l border-[#93A3C0]'>
        <FilterSearchIcon />
      </div> */}
    </div>
  );
}

export default React.memo(SearchInput);
