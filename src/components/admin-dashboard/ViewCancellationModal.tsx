'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface ViewCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  cancellationReason: string;
  cancelledAt: string | null;
}

export default function ViewCancellationModal({
  isOpen,
  onClose,
  projectName,
  cancellationReason,
  cancelledAt,
}: ViewCancellationModalProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Onbekende datum';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: nl });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Annuleringsreden
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Project Name */}
          <div>
            <p className="text-sm text-slate-500">Project</p>
            <p className="font-medium text-slate-900">{projectName}</p>
          </div>

          {/* Cancelled Date */}
          {cancelledAt && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="h-4 w-4" />
              <span>Geannuleerd op: {formatDate(cancelledAt)}</span>
            </div>
          )}

          {/* Cancellation Reason */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-900 mb-2">Reden</p>
            <p className="text-sm text-red-800 whitespace-pre-wrap">{cancellationReason}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
