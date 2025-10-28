import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function Loader({
  fullScreen = false,
  size = 'md',
  text = 'Laden...',
  className,
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const spinnerSize = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const LoaderContent = () => (
    <div className='flex flex-col items-center justify-center gap-4'>
      {/* Spinning Circle Loader */}
      <div className='relative'>
        {/* Outer ring with gradient */}
        <div className={cn('relative', sizeClasses[size])}>
          {/* Gradient spinning ring */}
          <div
            className={cn(
              'absolute inset-0 rounded-full',
              spinnerSize[size]
            )}
          />
<Image src='/gifs/loader.gif' width={350} height={350} alt='Loading....'/>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className={cn(
            'font-medium text-primary animate-pulse',
            textSize[size]
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          // Glassy background
          'bg-white/80 backdrop-blur-md',
          className
        )}
      >
          <LoaderContent />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <LoaderContent />
    </div>
  );
}

// Simple inline spinner for buttons
export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin',
        className
      )}
    />
  );
}
