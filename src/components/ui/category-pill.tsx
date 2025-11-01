import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CategoryPillProps {
  id: number;
  name: string;
  icon?: string | null;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CategoryPill({
  id,
  name,
  icon,
  selected = false,
  onClick,
  disabled = false,
  className,
}: CategoryPillProps) {
  return (
    <button
      key={id}
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4.5 py-3 cursor-pointer rounded-full text-base font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        selected
          ? 'bg-primary text-white'
          : 'bg-white text-slate-900 border border-neutral-300 hover:border-primary',
        className
      )}
      style={
        !selected ? { boxShadow: '0px 2px 6.5px 0px #0000001A' } : undefined
      }
    >
      {icon && (
        <Image
          src={icon}
          alt={name}
          width={14}
          height={14}
          className={cn(
            selected
              ? 'brightness-0 invert'
              : '[filter:brightness(0)_saturate(100%)_invert(7%)_sepia(8%)_saturate(6422%)_hue-rotate(187deg)_brightness(98%)_contrast(95%)]'
          )}
        />
      )}
      {name}
    </button>
  );
}
