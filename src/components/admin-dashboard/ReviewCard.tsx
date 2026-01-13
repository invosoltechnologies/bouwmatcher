'use client';

import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ReviewCardProps {
  id?: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  professionalName: string;
  companyName?: string;
  date: string;
  status?: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string | null;
  approvedAt?: string | null;
  isAdmin?: boolean;
  onApprove?: (reviewId: string) => Promise<void>;
  onReject?: (reviewId: string, reason: string) => Promise<void>;
  onShowRejectionModal?: () => void;
  isLoading?: boolean;
}

export default function ReviewCard({
  id,
  rating,
  reviewText,
  reviewerName,
  professionalName,
  companyName,
  date,
  status = 'approved',
  rejectionReason,
  approvedAt,
  isAdmin = false,
  onApprove,
  onReject,
  onShowRejectionModal,
  isLoading = false,
}: ReviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 uur geleden';
    if (diffDays < 2) return `${diffDays} uur geleden`;
    if (diffDays < 7) return `${diffDays} dagen geleden`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-50 text-yellow-700 border-0 font-normal px-2.5 py-0.5 text-xs rounded-md">
            In afwachting
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-50 text-red-700 border-0 font-normal px-2.5 py-0.5 text-xs rounded-md">
            Gemarkeerd
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-50 text-green-700 border-0 font-normal px-2.5 py-0.5 text-xs rounded-md">
            Goedgekeurd
          </Badge>
        );
      default:
        return null;
    }
  };

  // Get the appropriate border color based on status
  const getBorderColor = () => {
    switch (status) {
      case 'pending':
        return 'border-yellow-100';
      case 'rejected':
        return 'border-red-200';
      case 'approved':
        return 'border-green-100';
      default:
        return 'border-slate-200';
    }
  };

  // Get the appropriate background color based on status
  const getBackgroundColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50/30';
      case 'rejected':
        return 'bg-red-50';
      case 'approved':
        return 'bg-white';
      default:
        return 'bg-white';
    }
  };

  // Determine which buttons to show
  const showApproveButton = status !== 'approved';
  const showRejectButton = status !== 'rejected';

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-300 overflow-hidden',
        getBorderColor(),
        getBackgroundColor(),
        isHovered && isAdmin && id ? 'shadow-md' : 'shadow-sm'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        {/* Top Section: Rating and Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-5 h-5',
                  i < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300'
                )}
              />
            ))}
            <span className="ml-1 text-base font-semibold text-gray-900">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Status Badge */}
          {getStatusBadge()}
        </div>

        {/* Review Text */}
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          "{reviewText}"
        </p>

        {/* Reviewer Info and Date */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-gray-900">
              Door {reviewerName}
            </span>
            <span className="text-gray-500">
              voor {companyName || professionalName}
            </span>
          </div>
          <span className="text-gray-500 whitespace-nowrap ml-2">
            {formatDate(date)}
          </span>
        </div>
      </div>

      {/* Admin Action Buttons - Visible on Hover with Animation */}
      {isAdmin && id && (showApproveButton || showRejectButton) && (
        <div
          className={cn(
            'border-t border-gray-100 transition-all duration-300 ease-in-out',
            isHovered
              ? 'max-h-20 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <div className="p-3 flex gap-2 justify-start">
            {showApproveButton && (
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white h-9 font-normal text-sm rounded-lg px-6"
                onClick={() => onApprove?.(id)}
                disabled={isLoading}
              >
                Goedkeuren
              </Button>
            )}
            {showRejectButton && (
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white h-9 font-normal text-sm rounded-lg px-6"
                onClick={() => onShowRejectionModal?.()}
                disabled={isLoading}
              >
                Afwijzen
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
