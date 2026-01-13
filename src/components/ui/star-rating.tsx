'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  const displayValue = hoverValue || value;

  return (
    <div className={cn('flex gap-1', readonly && 'cursor-default')}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type='button'
          onClick={() => !readonly && onChange(star)}
          onMouseEnter={() => !readonly && setHoverValue(star)}
          onMouseLeave={() => !readonly && setHoverValue(0)}
          disabled={readonly}
          className={cn(
            'transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded',
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95 transition-transform'
          )}
        >
          <Star
            className={cn(
              sizeClass,
              star <= displayValue
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 fill-gray-100'
            )}
          />
        </button>
      ))}
    </div>
  );
}
