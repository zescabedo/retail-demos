'use client';

import React, { JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import { Placeholder, ComponentRendering, RouteData } from '@sitecore-content-sdk/nextjs';
import { Default as SearchResults } from './SearchResults';

interface SearchPageWrapperProps {
  route: RouteData | ComponentRendering | null;
  fields: {
    Title?: {
      value?: unknown;
    };
    [key: string]: unknown;
  };
}

export const SearchPageWrapper = ({ route, fields }: SearchPageWrapperProps): JSX.Element => {
  const searchParams = useSearchParams();
  const hasSearchQuery = searchParams?.get('q');

  if (!route) {
    return <></>;
  }

  // Check if this is the search page or has a search query
  const routePath =
    ('path' in route && typeof route.path === 'string' ? route.path : undefined)?.toLowerCase() ||
    '';
  const routeName =
    ('name' in route && typeof route.name === 'string' ? route.name : undefined)?.toLowerCase() ||
    '';
  const routeItemPath =
    ('itemPath' in route && typeof route.itemPath === 'string'
      ? route.itemPath
      : undefined
    )?.toLowerCase() || '';
  const pageTitle = fields?.Title?.value?.toString().toLowerCase() || '';

  const isSearchPage =
    hasSearchQuery || // Show search results if ?q= parameter exists
    routePath.includes('/search') ||
    routePath === '/search' ||
    routeName === 'search' ||
    routeItemPath.includes('/search') ||
    pageTitle === 'search';

  if (isSearchPage) {
    return (
      <SearchResults
        rendering={
          {
            ...route,
            componentName: 'SearchResults',
            placeholders: 'placeholders' in route ? route.placeholders : {},
          } as ComponentRendering
        }
        params={{
          RenderingIdentifier: 'search-results-auto',
          styles: '',
        }}
      />
    );
  }

  return <Placeholder name="headless-main" rendering={route as ComponentRendering} />;
};
