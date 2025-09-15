'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface ViewOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
}

interface ViewSwitcherProps {
  options: ViewOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function ViewSwitcher({
  options,
  value,
  onValueChange,
  className,
}: ViewSwitcherProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList className="bg-gray-100 p-1 h-auto">
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm",
              "data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-transparent",
              "hover:data-[state=inactive]:text-gray-800"
            )}
          >
            {option.icon && (
              <span className="flex-shrink-0">
                {option.icon}
              </span>
            )}
            {option.label && <span>{option.label}</span>}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}