import React from 'react';

interface PillProps {
  text: string;
  dotColor?: string;
  className?: string;
  hasBackground?: boolean;
  style?: React.CSSProperties;
}

export default function Pill({ text, dotColor = '#0AB27E', className = '',  style }: PillProps) {
  return (
    <div className={`inline-flex justify-center items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-4.5 border border-gray-200 ${className}`} style={style}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 relative">
        {/* Multiple pulse wave animations with delays */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-75"
          style={{ 
            backgroundColor: `${dotColor}40`,
            animationDuration: '2s'
          }}
        ></div>
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-50"
          style={{ 
            backgroundColor: `${dotColor}30`,
            animationDuration: '2s',
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-25"
          style={{ 
            backgroundColor: `${dotColor}20`,
            animationDuration: '2s',
            animationDelay: '1s'
          }}
        ></div>
        {/* Main dot */}
        <div 
          className="w-3 h-3 rounded-full relative z-10"
          style={{ backgroundColor: dotColor }}
        ></div>
      </div>
      <span className="text-foreground font-medium text-sm whitespace-nowrap font-montserrat">
        {text}
      </span>
    </div>
  );
}