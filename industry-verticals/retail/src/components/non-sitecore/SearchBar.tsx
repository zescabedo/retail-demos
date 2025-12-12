'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ showCheckbox = true }: { showCheckbox?: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [withinPurchased, setWithinPurchased] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    if (searchQuery.trim()) {
      // You can implement search functionality here
      console.log('Searching for:', searchQuery, 'Within Purchased:', withinPurchased);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What can we help you find?"
          className="border-border bg-background text-foreground placeholder:text-foreground-muted h-11 w-full rounded-md border px-4 pr-12 text-base focus:border-[#0066B2] focus:ring-2 focus:ring-[#0066B2]/20 focus:outline-none"
        />
        <button
          type="submit"
          className="text-background absolute top-0 right-0 flex h-full items-center justify-center rounded-r-md bg-[#0066B2] px-4 transition-colors hover:bg-[#0052A3]"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
      {showCheckbox && (
        <div className="mt-1.5 flex items-center gap-2">
          <input
            type="checkbox"
            id="purchased"
            checked={withinPurchased}
            onChange={(e) => setWithinPurchased(e.target.checked)}
            className="border-border h-4 w-4 rounded text-[#0066B2] focus:ring-[#0066B2]"
          />
          <label htmlFor="purchased" className="foreground-light cursor-pointer text-sm">
            Within Items Purchased
          </label>
        </div>
      )}
    </div>
  );
};
