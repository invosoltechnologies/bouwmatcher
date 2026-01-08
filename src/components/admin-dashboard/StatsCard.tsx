import { LucideIcon, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  value: string | number;
  label: string;
  topText?: string;
  change?: {
    value: string;
    isPositive?: boolean;
  };
  suffix?: string;
  bottomText?: string;
  bottomTextColor?: string;
  borderColor?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function StatsCard({
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-50',
  value,
  label,
  topText,
  change,
  suffix,
  borderColor = 'border-slate-200',
  isActive = false,
  onClick,
  bottomText,
  bottomTextColor = 'text-green-600',
}: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border-2 p-6 w-full transition-all duration-200',
        isActive ? `${borderColor} shadow-md scale-105` : 'border-slate-200 hover:shadow-sm',
        onClick && 'cursor-pointer'
      )}
    >
      {/* Top Text */}
      {topText && (
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
          {topText}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 mb-3">
        {/* Icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
            iconBgColor
          )}
        >
          <Icon className={cn('w-6 h-6', iconColor)} />
        </div>

        {/* Value */}
        <div className="flex-1">
          <div className="text-3xl leading-none font-bold text-slate-900">
            {value}
            {suffix && (
              <span className="text-sm text-slate-500 ml-1">
                {suffix}
              </span>
            )}
          </div>
        </div>

        {/* Change indicator */}
        {change && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium flex-shrink-0',
              change.isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            <TrendingUp className="w-4 h-4" />
            {change.value}
          </div>
        )}
      </div>

      {/* Label */}
      <p className="text-sm text-slate-600 font-medium">
        {label}
      </p>

      {/* Bottom text */}
      {bottomText && (
        <p className={cn('text-xs font-medium mt-2', bottomTextColor)}>
          {bottomText}
        </p>
      )}
    </div>
  );
}
