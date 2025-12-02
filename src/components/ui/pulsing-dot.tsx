import React from 'react';
import { cn } from '@/lib/utils';

interface PulsingDotProps {
  color?: string;
  showAnimation?: boolean;
  containerClassName?: string;
  dotClassName?: string;
}

export default function PulsingDot({
  color = '#0AB27E',
  showAnimation = true,
  containerClassName = '',
  dotClassName = '',
}: PulsingDotProps) {
  return (
    <div
      className={cn(
        'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 relative',
        containerClassName
      )}
    >
      {showAnimation && (
        <>
          {/* Multiple pulse wave animations with delays */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-75"
            style={{
              backgroundColor: `${color}40`,
              animationDuration: '2s'
            }}
          ></div>
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-50"
            style={{
              backgroundColor: `${color}30`,
              animationDuration: '2s',
              animationDelay: '0.5s'
            }}
          ></div>
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-25"
            style={{
              backgroundColor: `${color}20`,
              animationDuration: '2s',
              animationDelay: '1s'
            }}
          ></div>
        </>
      )}
      {/* Main dot */}
      <div
        className={cn(
          'w-3 h-3 rounded-full',
          showAnimation ? 'relative z-10' : '',
          dotClassName
        )}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}
