'use client';

import React, { useRef, useEffect, useState } from 'react';
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
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(() => {
    return options.findIndex(option => option.value === value);
  });
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    const newIndex = options.findIndex(option => option.value === value);
    setActiveTabIndex(newIndex);
  }, [value, options]);

  useEffect(() => {
    if (activeTabIndex === -1) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    onValueChange(options[index].value);
  };

  return (
    <div className={cn("relative flex bg-gray-100 rounded-xl py-1 px-1.5 border-gray-200 ", className)}>
      <span
        className="absolute top-1 bottom-1 z-10 flex overflow-hidden rounded-lg transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-lg bg-primary" />
      </span>
      {options.map((option, index) => {
        const isActive = activeTabIndex === index;

        return (
          <button
            key={option.value}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            className={cn(
              'flex items-center cursor-pointer gap-2 px-6 py-3 rounded-lg text-base font-medium transition-colors duration-200 relative z-10',
              isActive ? 'text-white' : 'text-muted-foreground hover:text-primary'
            )}
            onClick={() => handleTabClick(index)}
          >
            {option.icon && (
              <span className='flex-shrink-0'>{option.icon}</span>
            )}
            {option.label && <span>{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
}