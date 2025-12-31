import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  rating: number;
  reviewText: string;
  reviewerName: string;
  professionalName: string;
  date: string;
  status?: 'pending' | 'approved' | 'flagged';
}

export default function ReviewCard({
  rating,
  reviewText,
  reviewerName,
  professionalName,
  date,
  status = 'approved',
}: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 dag geleden';
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
          <Badge className="bg-yellow-50 text-yellow-700 border-0 capitalize">
            In afwachting
          </Badge>
        );
      case 'flagged':
        return (
          <Badge className="bg-red-50 text-red-700 border-0 capitalize">
            Gemarkeerd
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-50 text-green-700 border-0 capitalize">
            Goedgekeurd
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 fill-gray-300'
              )}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-secondary-foreground">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Status */}
        {getStatusBadge()}
      </div>

      {/* Review Text */}
      <p className="text-sm text-secondary-foreground mb-3 line-clamp-3">
        {reviewText}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div>
          <span className="font-medium">{reviewerName}</span>
          <span className="mx-1">•</span>
          <span>{professionalName}</span>
        </div>
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
}
