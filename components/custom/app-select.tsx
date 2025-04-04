import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AppSelect({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={placeholder || ''} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
