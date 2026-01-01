import { LucideIcon, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  value: string | number;
  label: string;
  change?: {
    value: string;
    isPositive?: boolean;
  };
  suffix?: string;
  bottomText?: string;
  bottomTextColor?: string;
}

export default function StatsCard({
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-50',
  value,
  label,
  change,
  suffix,
  bottomText,
  bottomTextColor = 'text-green-600',
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-[25px] max-w-[208px] w-full">
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            iconBgColor
          )}
        >
          <Icon className={cn('w-4 h-4', iconColor)} />
        </div>

        {/* Change indicator */}
        {change && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              change.isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            <TrendingUp className="w-4 h-4" />
            {change.value}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-2xl leading-none font-bold text-slate-900">
          {value}
          {suffix && (
            <span className="text-sm text-slate-500 ml-1">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {/* Label */}
      <p className="text-xs text-slate-500 mb-3">
        {label}
      </p>

      {/* Bottom text */}
      {bottomText && (
        <p className={cn('text-xs font-medium', bottomTextColor)}>
          {bottomText}
        </p>
      )}
    </div>
  );
}
