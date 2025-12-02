import React from 'react';
import { cn } from '@/lib/utils';
import PulsingDot from './pulsing-dot';

interface PillProps {
  text: string;
  dotColor?: string;
  className?: string;
  dotContainerClassName?: string;
  dotClassName?: string;
  textClassName?: string;
  style?: React.CSSProperties;
}

export default function Pill({
  text,
  dotColor = '#0AB27E',
  className = '',
  dotContainerClassName = '',
  dotClassName = '',
  textClassName = '',
  style
}: PillProps) {
  return (
    <div
      className={cn(
        'inline-flex justify-center items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-4.5 border border-gray-200',
        className
      )}
      style={style}
    >
      <PulsingDot
        color={dotColor}
        showAnimation={true}
        containerClassName={dotContainerClassName}
        dotClassName={dotClassName}
      />
      <span className={cn(
        'text-foreground font-medium text-sm whitespace-nowrap font-montserrat',
        textClassName
      )}>
        {text}
      </span>
    </div>
  );
}