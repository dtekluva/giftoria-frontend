'use client';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useSearchAllBrands } from '@/services/queries/brand.queries';
import { useState, useRef, useEffect } from 'react';
import { ICard } from '@/libs/types/brand.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/libs/utils';

interface GiftCardSearchBarProps {
  onSelect?: (brand: ICard) => void;
}

export function GiftCardSearchBar({ onSelect }: GiftCardSearchBarProps) {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { query } = useSearchAllBrands({ search });
  const suggestions = query.data?.results || [];
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className='relative w-full'>
      <div className='flex relative items-stretch bg-white rounded-[30px] overflow-hidden w-full shadow-sm border border-gray-200'>
        <Input
          ref={inputRef}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className='max-h-11 border-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pr-12'
          placeholder='Search gift card.....'
        />

        <button
          className='bg-[#990099] rounded-[30px] py-[10px] px-[17px] ml-auto hover:bg-[#800080] transition-colors duration-200'
          onClick={() => {
            if (search) {
              router.push(`/gift-card?search=${encodeURIComponent(search)}`);
              setShowSuggestions(false);
            }
          }}>
          <SearchIcon className='text-white' />
        </button>
      </div>

      {showSuggestions && search && (
        <div
          style={{
            position: 'fixed',
            top: inputRef.current
              ? inputRef.current.getBoundingClientRect().bottom + 8
              : 'auto',
            left: 0,
            right: 0,
            zIndex: 9999999,
          }}
          className={cn(
            'bg-white border border-gray-200 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto mx-4',
            suggestions.length === 0 ? 'py-4' : ''
          )}>
          {suggestions.length > 0 ? (
            suggestions.map((brand: ICard) => (
              <div
                key={brand.id}
                className='px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 flex items-center border-b last:border-b-0'
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
                    className='w-10 h-10 mr-3 rounded object-cover'
                  />
                )}
                <div>
                  <div className='font-medium text-gray-900'>
                    {brand.brand_name}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center text-gray-500 text-sm'>
              No gift cards found for &quot;{search}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
