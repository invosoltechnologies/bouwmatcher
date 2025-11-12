'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function GlassyModal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: GlassyModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        {/* Glassy Overlay */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-neutral-700/75 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ backdropFilter: 'blur(14.5px)' }}
        />

        {/* Modal Content */}
        <DialogPrimitive.Content
          className={cn(
            'fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
            'w-full max-w-[calc(100%-2rem)] sm:max-w-lg',
            'bg-white rounded-2xl shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'duration-200',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
            <DialogPrimitive.Title className="text-xl font-semibold text-secondary-foreground">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="rounded-xs cursor-pointer opacity-70 transition-opacity hover:opacity-100 focus:ring-0  disabled:pointer-events-none"
              onClick={onClose}
            >
              <XIcon className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Sluiten</span>
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div className="px-6 py-5">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
