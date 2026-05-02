import type { ChangeEvent } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        placeholder="Search actors, directors..."
        className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};
