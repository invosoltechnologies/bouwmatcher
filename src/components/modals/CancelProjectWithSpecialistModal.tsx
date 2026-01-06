'use client';

import { useState } from 'react';
import { useCancelProject } from '@/lib/hooks/project/useCancelProject';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface CancelProjectWithSpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  accessToken: string;
  professionalEmail: string;
  onSuccess?: () => void;
}

export function CancelProjectWithSpecialistModal({
  isOpen,
  onClose,
  projectId,
  accessToken,
  professionalEmail,
  onSuccess,
}: CancelProjectWithSpecialistModalProps) {
  const [cancellationReason, setCancellationReason] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const cancelMutation = useCancelProject();

  const handleCancel = async () => {
    if (cancellationReason.trim().length < 10) return;
    if (rating === 0) return;
    if (review.trim().length < 10) return;

    try {
      await cancelMutation.mutateAsync({
        projectId,
        accessToken,
        cancellationReason: cancellationReason.trim(),
        review: {
          professionalEmail,
          rating,
          reviewText: review.trim(),
        },
      });

      setCancellationReason('');
      setRating(0);
      setReview('');
      onClose();
      onSuccess?.();
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const isValid =
    cancellationReason.trim().length >= 10 &&
    rating > 0 &&
    review.trim().length >= 10 &&
    !cancelMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cancel Project & Leave Review</DialogTitle>
          <DialogDescription>
            Please provide a cancellation reason and share your experience with
            the assigned professional.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {/* Cancellation Reason */}
          <div>
            <label className="text-sm sm:text-base font-medium mb-2 block">
              Cancellation Reason
            </label>
            <Textarea
              placeholder="Please explain why you are cancelling this project..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              disabled={cancelMutation.isPending}
              minLength={10}
              className="w-full min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {cancellationReason.length} / 10 minimum characters required.
            </p>
          </div>

          {/* Rate Your Experience */}
          <div>
            <label className="text-sm sm:text-base font-medium mb-3 block">
              Rate Your Experience
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Rating
                value={rating}
                onValueChange={setRating}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    key={index}
                    className='text-yellow-500'
                    size={typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 28}
                  />
                ))}
              </Rating>
              <span className="text-base sm:text-lg font-medium">
                {rating > 0 ? `${rating} / 5` : 'Please rate'}
              </span>
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="text-sm sm:text-base font-medium mb-2 block">
              Review
            </label>
            <Textarea
              placeholder="Share your experience working with this professional..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={cancelMutation.isPending}
              minLength={10}
              className="w-full min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {review.length} / 10 minimum characters required.
            </p>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-900">
              <strong>Note:</strong> Your feedback helps us maintain quality service and ensures the professional community remains trustworthy.
            </p>
          </div>
        </form>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={cancelMutation.isPending}
            className="w-full sm:w-auto border-gray-200 rounded-xl text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6"
          >
            Keep Project
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={!isValid}
            className="w-full sm:w-auto rounded-xl text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 gap-2"
          >
            {cancelMutation.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Cancel & Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
