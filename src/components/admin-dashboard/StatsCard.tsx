import { LucideIcon } from 'lucide-react';
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
}

export default function StatsCard({
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-50',
  value,
  label,
  change,
  suffix,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-6">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className={cn(
            'w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center',
            iconBgColor
          )}
        >
          <Icon className={cn('w-5 h-5 md:w-6 md:h-6', iconColor)} />
        </div>

        {/* Change indicator */}
        {change && (
          <div
            className={cn(
              'text-xs md:text-sm font-medium px-2 py-1 rounded',
              change.isPositive
                ? 'text-green-600 bg-green-50'
                : 'text-red-600 bg-red-50'
            )}
          >
            {change.isPositive ? '+' : ''}
            {change.value}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-4">
        <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">
          {value}
          {suffix && (
            <span className="text-lg md:text-xl text-muted-foreground ml-1">
              {suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}
