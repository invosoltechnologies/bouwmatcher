'use client';

import { useState } from 'react';
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

interface ReviewRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  isLoading?: boolean;
}

export function ReviewRejectionModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: ReviewRejectionModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleConfirm = async () => {
    if (rejectionReason.trim().length < 10) return;

    try {
      await onConfirm(rejectionReason);
      setRejectionReason('');
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const handleClose = () => {
    setRejectionReason('');
    onClose();
  };

  const isValid = rejectionReason.trim().length >= 10 && !isLoading;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md lg:max-w-2xl bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle>Reject Review</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this review. The reason will be stored
            for administrative tracking purposes.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          <div>
            <label className="text-sm sm:text-base font-medium mb-2 block">
              Rejection Reason
            </label>
            <Textarea
              placeholder="Explain why this review is being rejected (e.g., inappropriate content, spam, offensive language, etc.)..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              disabled={isLoading}
              minLength={10}
              className="w-full min-h-[120px] sm:min-h-[150px] resize-none text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {rejectionReason.length} / 10 minimum characters required.
            </p>
          </div>

          {/* Info Message */}
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
            <p className="text-xs sm:text-sm text-red-900">
              <strong>Note:</strong> This action will mark the review as rejected and the reason
              will be stored for administrative records.
            </p>
          </div>
        </form>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="w-full sm:w-auto border-gray-200 rounded-xl text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isValid}
            className="w-full sm:w-auto rounded-xl text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 gap-2"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
