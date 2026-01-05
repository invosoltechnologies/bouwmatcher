'use client';

import React, { useState } from 'react';
import { useCreateReview } from '@/lib/hooks/project/useCreateReview';
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

interface ProjectCompletionReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  accessToken: string;
  professionalEmail: string;
  onSuccess?: () => void;
}

export function ProjectCompletionReviewModal({
  isOpen,
  onClose,
  projectId,
  accessToken,
  professionalEmail,
  onSuccess,
}: ProjectCompletionReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const createReviewMutation = useCreateReview();

  const handleSubmitReview = async () => {
    if (rating === 0) return;
    if (review.trim().length < 10) return;

    try {
      await createReviewMutation.mutateAsync({
        projectId,
        accessToken,
        professionalEmail,
        rating,
        reviewText: review.trim(),
      });

      setRating(0);
      setReview('');
      onClose();
      onSuccess?.();
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const isValid =
    rating > 0 &&
    review.trim().length >= 10 &&
    !createReviewMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            Tell us about your experience with this professional. Your review
            helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="text-sm font-medium mb-3 block">
              How would you rate this professional?
            </label>
            <StarRating value={rating} onChange={setRating} size="lg" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Share Your Review
            </label>
            <Textarea
              placeholder="Tell us about your experience with this professional. What went well? Any areas for improvement?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={createReviewMutation.isPending}
              minLength={10}
              maxLength={1000}
              className="min-h-[120px]"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Minimum 10 characters required.
              </p>
              <p className="text-xs text-muted-foreground">
                {review.length} / 1000
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={createReviewMutation.isPending}
          >
            Skip Review
          </Button>
          <Button
            onClick={handleSubmitReview}
            disabled={!isValid}
            className="gap-2"
          >
            {createReviewMutation.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
