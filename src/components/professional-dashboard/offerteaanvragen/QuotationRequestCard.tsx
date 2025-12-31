'use client';

import { Lock, Image as ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('common.proDashboard.offerteaanvragen.quotationCard');

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-5 border border-gray-200 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Title and Lock Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h3 className="text-sm sm:text-base font-semibold text-foreground">
              {title}
            </h3>
            {/* Lock Badge */}
            {isLocked && (
              <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-primary/10 rounded-full w-fit">
                <Lock className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">{t('locked')}</span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            {author}
          </p>

          {/* Photos Badge */}
          {hasPhotos && photoCount > 0 && (
            <div className="flex items-center gap-1.5">
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                {photoCount} {t('photos')}
              </span>
            </div>
          )}

          {/* Not Available Badge */}
          {!isAvailable && (
            <div className="mt-2">
              <span className="text-xs sm:text-sm text-primary">{t('notAvailable')}</span>
            </div>
          )}
        </div>

        {/* Right Content - Date */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium text-foreground">{date}</span>
        </div>
      </div>
    </div>
  );
}
