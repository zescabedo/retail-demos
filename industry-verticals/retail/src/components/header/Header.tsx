'use client';

import React, { JSX, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder, Link, LinkField } from '@sitecore-content-sdk/nextjs';
import { SearchBar } from '@/components/non-sitecore/SearchBar';
import { Menu, ShoppingBag, Settings, X } from 'lucide-react';

export type HeaderProps = ComponentProps & {
  fields?: {
    LoginPage?: LinkField;
    CreateAccountPage?: LinkField;
  };
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`component header bg-background border-b ${styles}`} id={id}>
      <div className="container px-4 py-3">
        {/* Main Header Row */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>

          {/* Search Bar - Hidden on mobile, shown on md+ */}
          <div className="hidden max-w-xl flex-1 md:flex">
            <SearchBar showCheckbox={true} />
          </div>

          {/* Right Side Icons */}
          <div className="ml-auto flex items-center gap-2 md:gap-6">
            {/* Mobile Menu Toggle */}
            <button
              className="flex flex-col items-center gap-1 text-[#0066B2] transition-colors hover:text-[#0052A3] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Navigation - Menu, Shop, My Account */}
            <div className="hidden items-center gap-6 md:flex">
              <button className="flex flex-col items-center gap-1 text-[#0066B2] transition-colors hover:text-[#0052A3]">
                <Menu className="h-8 w-8" />
                <span className="text-xs font-medium">Menu</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-red-600 transition-colors hover:text-red-700">
                <ShoppingBag className="h-8 w-8" />
                <span className="text-xs font-medium">Shop</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-[#0066B2] transition-colors hover:text-[#0052A3]">
                <Settings className="h-8 w-8" />
                <span className="text-xs font-medium">My Account</span>
              </button>
            </div>

            {/* Cart and Navigation Icons from Sitecore */}
            <div className="flex items-center">
              <Placeholder
                name={`header-right-${DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
            </div>
          </div>
        </div>

        {/* Mobile Search - Shown on mobile only */}
        <div className="mt-3 md:hidden">
          <SearchBar showCheckbox={false} />
        </div>

        {/* Bottom Row - Login and Cart Info */}
        <div className="border-border mt-3 flex flex-col items-start justify-between gap-3 border-t pt-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {props.fields?.LoginPage ? (
              <Link
                field={props.fields.LoginPage}
                className="text-background inline-flex h-8 items-center rounded bg-red-600 px-4 text-sm font-semibold transition-colors hover:bg-red-700"
              >
                LOGIN
              </Link>
            ) : (
              <button className="text-background h-8 rounded bg-red-600 px-4 text-sm font-semibold transition-colors hover:bg-red-700">
                LOGIN
              </button>
            )}
            {props.fields?.CreateAccountPage ? (
              <Link
                field={props.fields.CreateAccountPage}
                className="h-8 px-0 text-sm text-[#0066B2] transition-colors hover:text-[#0052A3]"
              >
                Create an Online Account
              </Link>
            ) : (
              <button className="h-8 px-0 text-sm text-[#0066B2] transition-colors hover:text-[#0052A3]">
                Create an Online Account
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground-light text-sm">My Order:</span>
            <span className="text-foreground text-lg font-bold">$0.00</span>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="bg-opacity-50 fixed inset-0 z-50 bg-black md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="bg-background h-full w-64 p-6" onClick={(e) => e.stopPropagation()}>
              <button
                className="text-foreground hover:text-foreground-light mb-6 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <nav className="space-y-4">
                <button className="flex w-full items-center gap-3 text-[#0066B2] transition-colors hover:text-[#0052A3]">
                  <Menu className="h-6 w-6" />
                  <span className="font-medium">Menu</span>
                </button>
                <button className="flex w-full items-center gap-3 text-red-600 transition-colors hover:text-red-700">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="font-medium">Shop</span>
                </button>
                <button className="flex w-full items-center gap-3 text-[#0066B2] transition-colors hover:text-[#0052A3]">
                  <Settings className="h-6 w-6" />
                  <span className="font-medium">My Account</span>
                </button>
              </nav>
              {/* Mobile Navigation from Sitecore */}
              <div className="mt-6">
                <Placeholder
                  name={`header-nav-${DynamicPlaceholderId}`}
                  rendering={props.rendering}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
