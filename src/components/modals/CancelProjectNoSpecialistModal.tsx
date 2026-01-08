'use client';

import React, { useState } from 'react';
import { useCancelProject } from '@/lib/hooks/project/useCancelProject';
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

interface CancelProjectNoSpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  accessToken: string;
  onSuccess?: () => void;
}

export function CancelProjectNoSpecialistModal({
  isOpen,
  onClose,
  projectId,
  accessToken,
  onSuccess,
}: CancelProjectNoSpecialistModalProps) {
  const [reason, setReason] = useState('');
  const cancelMutation = useCancelProject();

  const handleCancel = async () => {
    if (reason.trim().length < 10) return;

    try {
      await cancelMutation.mutateAsync({
        projectId,
        accessToken,
        cancellationReason: reason,
      });

      setReason('');
      onClose();
      onSuccess?.();
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  const isValid = reason.trim().length >= 10 && !cancelMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cancel Project</DialogTitle>
          <DialogDescription>
            Please provide a reason for cancelling this project.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Cancellation Reason
            </label>
            <Textarea
              placeholder="Please explain why you are cancelling this project..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={cancelMutation.isPending}
              minLength={10}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Minimum 10 characters required.
            </p>
          </div>

          {reason.trim().length > 0 && (
            <p className="text-xs text-muted-foreground">
              {reason.trim().length} / 10 characters
            </p>
          )}
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
            Cancel Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
