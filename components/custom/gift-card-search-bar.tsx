'use client';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useSearchAllBrands } from '@/services/queries/brand.queries';
import { useState } from 'react';
import { ICard } from '@/libs/types/brand.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface GiftCardSearchBarProps {
  onSelect?: (brand: ICard) => void;
}

export function GiftCardSearchBar({ onSelect }: GiftCardSearchBarProps) {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { query } = useSearchAllBrands({ search });
  const suggestions = query.data?.results || [];
  const router = useRouter();

  return (
    <div className='md:hidden flex relative flex-1 grow items-stretch bg-white rounded-[30px] overflow-hidden min-w-[278px]'>
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            router.push(`/gift-card?search=${encodeURIComponent(search)}`);
            setShowSuggestions(false);
          }
        }}
        className='max-h-11 border-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
        placeholder='Search gift card.....'
      />

      <div className='bg-[#990099] rounded-[30px] py-[10px] px-[17px] ml-auto'>
        <SearchIcon className='text-white' />
      </div>

      {showSuggestions && search && suggestions.length > 0 && (
        <div className='absolute z-[9999999] md:min-w-[300px] mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto'>
          {suggestions.map((brand: ICard) => (
            <div
              key={brand.id}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center border-b last:border-b-0'
              onMouseDown={() => {
                if (onSelect) onSelect(brand);
                router.push(`/gift-card/${brand.id}`);
                setShowSuggestions(false);
                setSearch(brand.brand_name);
              }}>
              {brand.image && (
                <Image
                  src={brand.image}
                  width={40}
                  height={40}
                  alt={brand.brand_name}
                  className='w-10 h-10 mr-2 rounded'
                />
              )}
              <div>
                <div className='font-semibold'>{brand.brand_name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showSuggestions && search && suggestions.length === 0 && (
        <div className='absolute z-[9999999] top-20 right-40 md:min-w-[300px] mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto flex items-center justify-center py-4'>
          <span className='text-gray-500 text-sm'>
            No gift cards found for &quot;{search}&quot;
          </span>
        </div>
      )}
    </div>
  );
}
