'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { RadiusOption } from '@/types/map';
import { DEFAULT_RADIUS_OPTIONS } from '@/types/map';

interface RadiusSelectorProps {
  selectedRadius: number;
  onRadiusChange: (radius: number) => void;
  options?: RadiusOption[];
  disabled?: boolean;
  label?: string;
  variant?: 'default' | 'compact';
}

export function RadiusSelector({
  selectedRadius,
  onRadiusChange,
  options = DEFAULT_RADIUS_OPTIONS,
  disabled = false,
  label = 'Straal',
  variant = 'default',
}: RadiusSelectorProps) {
  const labelClassName = variant === 'compact'
    ? 'text-sm text-slate-900'
    : 'text-sm md:text-lg text-slate-900';

  return (
    <div className='space-y-3'>
      {label && <Label className={labelClassName}>{label}</Label>}
      <div className='flex flex-wrap gap-3'>
        {options.map((option) => (
          <button
            key={option.value}
            type='button'
            onClick={() => onRadiusChange(option.value)}
            disabled={disabled}
            className={cn(
              'px-6 py-3 cursor-pointer rounded-full text-base font-medium transition-all',
              selectedRadius === option.value
                ? 'bg-primary text-white'
                : 'bg-white text-slate-900 border border-neutral-300 hover:border-primary',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
