'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface SuggestSpecializationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SuggestSpecializationDialog({
  open,
  onOpenChange,
}: SuggestSpecializationDialogProps) {
  const t = useTranslations('auth.register.serviceCategories.suggestDialog');
  const [categoryName, setCategoryName] = useState('');
  const [specializedFields, setSpecializedFields] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!categoryName.trim()) {
      toast.error(t('categoryNameRequired'));
      return;
    }

    if (!specializedFields.trim()) {
      toast.error(t('specializedFieldsRequired'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/suggest-specialization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName,
          specializedFields,
          message,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit suggestion');
      }

      toast.success(t('successMessage'));

      // Reset form and close dialog
      setCategoryName('');
      setSpecializedFields('');
      setMessage('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      toast.error(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg bg-white/95 backdrop-blur-md border-white/20 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-900">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Category Name Field */}
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-sm font-medium">
              {t('categoryNameLabel')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder={t('categoryNamePlaceholder')}
              disabled={isSubmitting}
              className="bg-white/80"
            />
          </div>

          {/* Specialized Fields */}
          <div className="space-y-2">
            <Label htmlFor="specializedFields" className="text-sm font-medium">
              {t('specializedFieldsLabel')} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="specializedFields"
              value={specializedFields}
              onChange={(e) => setSpecializedFields(e.target.value)}
              placeholder={t('specializedFieldsPlaceholder')}
              disabled={isSubmitting}
              className="bg-white/80 min-h-24"
            />
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              {t('messageLabel')}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('messagePlaceholder')}
              disabled={isSubmitting}
              className="bg-white/80 min-h-28"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t('cancelButton')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('submittingButton')}
                </>
              ) : (
                t('submitButton')
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
