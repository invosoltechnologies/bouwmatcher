import { cn } from '@/lib/utils';

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
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const LoaderContent = () => (
    <div className='flex flex-col items-center justify-center gap-6'>
      {/* Triple Ring Spinner */}
      <div className='relative'>
        <div className={cn('relative flex items-center justify-center', sizeClasses[size])}>
          <div className='loader-rings' />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className={cn(
            'font-medium text-primary',
            textSize[size]
          )}
        >
          {text}
        </p>
      )}

      <style jsx>{`
        .loader-rings {
          width: 100%;
          height: 100%;
          aspect-ratio: 1;
          display: grid;
          border: 4px solid transparent;
          border-radius: 50%;
          border-right-color: #0AB27E;
          animation: spin-outer 1s infinite linear;
        }

        .loader-rings::before,
        .loader-rings::after {
          content: "";
          grid-area: 1/1;
          margin: 2px;
          border: inherit;
          border-radius: 50%;
          border-right-color: #023AA2;
          animation: spin-middle 2s infinite linear;
        }

        .loader-rings::after {
          margin: 8px;
          border-right-color: #0AB27E;
          animation: spin-inner 3s infinite linear;
        }

        @keyframes spin-outer {
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-middle {
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-inner {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
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
