'use client';

import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PreviewSearch } from '@sitecore-search/ui';
import PreviewSearchWidget from 'src/components/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/_data/customizations';

export const SearchBar = ({ showCheckbox = true }: { showCheckbox?: boolean }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [withinPurchased, setWithinPurchased] = useState(false);
  const router = useRouter();
  const keyphraseHandlerRef = useRef<((value: string) => void) | null>(null);

  return (
    <div className="w-full">
      <PreviewSearch.Root>
        <div className="relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSearchOpen(false);
              const form = e.currentTarget as HTMLFormElement;
              const input = form.querySelector('input[name="query"]') as HTMLInputElement;
              if (input && input.value.trim()) {
                const searchParams = new URLSearchParams();
                searchParams.set('q', input.value.trim());
                if (withinPurchased) {
                  searchParams.set('purchased', 'true');
                }
                router.push(`/?${searchParams.toString()}`);
                input.value = '';
              }
            }}
            className="relative"
          >
            <PreviewSearch.Input
              name="query"
              onChange={(e) => {
                const value = e.target.value;
                setIsSearchOpen(value.length > 0);
                // Trigger keyphrase change in the widget
                if (keyphraseHandlerRef.current) {
                  keyphraseHandlerRef.current(value);
                }
              }}
              onFocus={(e) => {
                if (e.target.value.length > 0) {
                  setIsSearchOpen(true);
                }
              }}
              placeholder="What can we help you find?"
              className="border-border bg-background text-foreground placeholder:text-foreground-muted h-11 w-full rounded-md border px-4 pr-12 text-base focus:border-[#0066B2] focus:ring-2 focus:ring-[#0066B2]/20 focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              className="text-background absolute top-0 right-0 flex h-full items-center justify-center rounded-r-md bg-[#0066B2] px-4 transition-colors hover:bg-[#0052A3]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
        {isSearchOpen && (
          <PreviewSearch.Content className="absolute top-full z-50 mt-2 flex h-[400px] w-[var(--radix-popover-trigger-width)] justify-center bg-gray-100 pt-0 shadow-[2px_5px_5px_5px_rgba(0,0,0,0.3)] transition-opacity dark:bg-gray-800">
            <PreviewSearchWidget
              isOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
              hideForm={true}
              rfkId={PREVIEW_WIDGET_ID}
              showCheckbox={false}
              withinPurchased={withinPurchased}
              setWithinPurchased={setWithinPurchased}
              onKeyphraseChangeHandler={(handler) => {
                keyphraseHandlerRef.current = handler;
              }}
            />
          </PreviewSearch.Content>
        )}
      </PreviewSearch.Root>
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
