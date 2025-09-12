import React from 'react';

interface PillProps {
  text: string;
  dotColor?: string;
  className?: string;
  hasBackground?: boolean;
  style?: React.CSSProperties;
}

export default function Pill({ text, dotColor = '#0AB27E', className = '', hasBackground = false, style }: PillProps) {
  return (
    <div className={`inline-flex justify-center items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-4.5 border border-gray-200 ${className}`} style={style}>
      {hasBackground ? (
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${dotColor}20` }}>
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: dotColor }}
          ></div>
        </div>
      ) : (
        <div 
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor }}
        ></div>
      )}
      <span className="text-foreground font-medium text-sm whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}