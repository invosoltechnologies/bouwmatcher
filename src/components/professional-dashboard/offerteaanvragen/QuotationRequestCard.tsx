'use client';

import { Lock, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { isLeadCardInactive, getLeadCardClasses } from '@/lib/utils/project-professional-status';

interface QuotationRequestCardProps {
  title: string;
  author: string;
  date: string;
  isLocked: boolean;
  hasPhotos?: boolean;
  photoCount?: number;
  isAvailable?: boolean;
  assignmentStatus?: 'available' | 'assigned_to_me' | 'acquired_by_another';
  projectStatus?: string;
  isVisibilityActive?: boolean;
}

export default function QuotationRequestCard({
  title,
  author,
  date,
  isLocked,
  hasPhotos = false,
  photoCount = 0,
  isAvailable = true,
  assignmentStatus = 'available',
  projectStatus = 'pending_quotes',
  isVisibilityActive = true,
}: QuotationRequestCardProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.quotationCard');

  // Determine if card should be displayed as disabled/inactive
  const isInactive = isLeadCardInactive(isLocked, isVisibilityActive);

  // Get assignment badge info
  const getAssignmentBadge = () => {
    switch (assignmentStatus) {
      case 'assigned_to_me':
        return {
          icon: Check,
          label: t('assignmentStatus.assignedToMe') || 'Assigned to Me',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
        };
      case 'acquired_by_another':
        return {
          icon: AlertCircle,
          label: t('assignmentStatus.acquiredByAnother') || 'Acquired by Another',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-700',
          iconColor: 'text-orange-600',
        };
      default:
        return null;
    }
  };

  const assignmentBadge = getAssignmentBadge();

  return (
    <div
      className={`rounded-xl p-3 sm:p-4 lg:p-5 border transition-all ${getLeadCardClasses(isInactive)}`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Title and Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 flex-wrap">
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
            {/* Assignment Status Badge */}
            {assignmentBadge && (() => {
              const IconComponent = assignmentBadge.icon;
              return (
                <div className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 ${assignmentBadge.bgColor} rounded-full w-fit`}>
                  <IconComponent className={`w-3 h-3 ${assignmentBadge.iconColor}`} />
                  <span className={`text-xs font-medium ${assignmentBadge.textColor}`}>
                    {assignmentBadge.label}
                  </span>
                </div>
              );
            })()}
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
