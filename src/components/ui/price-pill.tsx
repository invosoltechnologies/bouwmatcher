import { cn } from '@/lib/utils';

interface PricePillProps {
  price: number;
  type: 'particulier' | 'zakelijk';
  className?: string;
}

export function PricePill({ price, type, className }: PricePillProps) {
  const isParticulier = type === 'particulier';

  return (
    <div
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium border',
        isParticulier
          ? 'bg-primary/10 text-primary border-primary'
          : 'bg-accent/10 text-accent border-accent',
        className
      )}
    >
      €{price.toFixed(2)} ({isParticulier ? 'Particulier' : 'Zakelijk'})
    </div>
  );
}
