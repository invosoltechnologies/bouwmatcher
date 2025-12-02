'use client';

import { Lock, Image as ImageIcon } from 'lucide-react';

interface QuotationRequestCardProps {
  title: string;
  author: string;
  date: string;
  isLocked: boolean;
  hasPhotos?: boolean;
  photoCount?: number;
  isAvailable?: boolean;
}

export default function QuotationRequestCard({
  title,
  author,
  date,
  isLocked,
  hasPhotos = false,
  photoCount = 0,
  isAvailable = true,
}: QuotationRequestCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Title and Lock Badge */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-base font-semibold text-foreground">
              {title}
            </h3>
            {/* Lock Badge */}
            {isLocked && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-full">
                <Lock className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">Vergrendeld</span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {author}
          </p>

          {/* Photos Badge */}
          {hasPhotos && photoCount > 0 && (
            <div className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {photoCount} foto&apos;s
              </span>
            </div>
          )}

          {/* Not Available Badge */}
          {!isAvailable && (
            <div className="mt-2">
              <span className="text-sm text-primary">Niet meer beschikbaar</span>
            </div>
          )}
        </div>

        {/* Right Content - Date */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm font-medium text-foreground">{date}</span>
        </div>
      </div>
    </div>
  );
}
