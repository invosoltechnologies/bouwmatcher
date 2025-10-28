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
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const imageSize = {
    sm: { width: 70, height: 70 },
    md: { width: 120, height: 120 },
    lg: { width: 150, height: 150 },
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const LoaderContent = () => (
    <div className='flex flex-col items-center justify-center gap-4'>
      {/* GIF Loader */}
      <div className='relative'>
        <div className={cn('relative flex items-center justify-center', sizeClasses[size])}>
          <Image
            src='/gifs/loader.gif'
            width={imageSize[size].width}
            height={imageSize[size].height}
            alt='Loading....'
            className='object-contain'
          />
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
