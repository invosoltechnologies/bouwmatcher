'use client';

import { useState, useCallback } from 'react';
import { useAssignProfessional } from '@/lib/hooks/project/useAssignProfessional';
import { useFindProfessionalByEmail } from '@/lib/hooks/project/useFindProfessionalByEmail';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Check } from 'lucide-react';

interface AssignProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  accessToken: string;
  onSuccess?: () => void;
}

export function AssignProfessionalModal({
  isOpen,
  onClose,
  projectId,
  accessToken,
  onSuccess,
}: AssignProfessionalModalProps) {
  const [email, setEmail] = useState('');

  const { professional, isLoading: isSearching } =
    useFindProfessionalByEmail(email);
  const assignMutation = useAssignProfessional();

  const handleAssign = useCallback(async () => {
    if (!professional) return;

    try {
      await assignMutation.mutateAsync({
        projectId,
        accessToken,
        professionalEmail: professional.quotes_email,
      });

      setEmail('');
      onClose();
      onSuccess?.();
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  }, [professional, projectId, accessToken, assignMutation, onClose, onSuccess]);

  const isValid = professional && !assignMutation.isPending;
  const showProfessionalDetails = professional && !isSearching;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Professional</DialogTitle>
          <DialogDescription>
            Enter the email address of the professional you want to assign to
            this project.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Professional Email
            </label>
            <Input
              placeholder="professional@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={assignMutation.isPending}
            />
          </div>

          {isSearching && email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Searching...
            </div>
          )}

          {showProfessionalDetails && (
            <div className="border rounded-md p-3 bg-muted/50">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium">
                    {professional.first_name} {professional.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {professional.quotes_email}
                  </p>
                </div>
                <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
              </div>
            </div>
          )}

          {email && !isSearching && !professional && (
            <div className="text-sm text-red-600">
              No professional found with this email.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={assignMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!isValid}
            className="gap-2"
          >
            {assignMutation.isPending && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Assign Professional
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
