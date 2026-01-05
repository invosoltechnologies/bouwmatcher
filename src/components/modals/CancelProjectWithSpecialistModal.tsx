'use client';

import React, { useState } from 'react';
import { useCancelProject } from '@/lib/hooks/project/useCancelProject';
import { StarRating } from '@/components/ui/star-rating';
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancel Project & Leave Review</DialogTitle>
          <DialogDescription>
            Please provide a cancellation reason and share your experience with
            the assigned professional.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Cancellation Reason
            </label>
            <Textarea
              placeholder="Please explain why you are cancelling this project..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              disabled={cancelMutation.isPending}
              minLength={10}
              className="min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Minimum 10 characters required.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">
              Rate Your Experience
            </label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Review</label>
            <Textarea
              placeholder="Share your experience working with this professional..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={cancelMutation.isPending}
              minLength={10}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Minimum 10 characters required.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={cancelMutation.isPending}
          >
            Keep Project
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={!isValid}
            className="gap-2"
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
