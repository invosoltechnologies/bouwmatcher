'use client';

import { useLocale } from 'next-intl';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, Save, Send } from 'lucide-react';

interface PublishModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveAsDraft: () => void;
  onPublish: () => void;
  isLoading?: boolean;
  currentStatus: 'draft' | 'pending' | 'published';
}

export default function PublishModal({
  open,
  onOpenChange,
  onSaveAsDraft,
  onPublish,
  isLoading = false,
  currentStatus,
}: PublishModalProps) {
  const locale = useLocale();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {locale === 'nl' ? 'Blogpost opslaan' : 'Save Blog Post'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {locale === 'nl'
              ? 'Wil je deze blogpost opslaan als concept of publiceren?'
              : 'Do you want to save this blog post as a draft or publish it?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel disabled={isLoading}>
            {locale === 'nl' ? 'Annuleren' : 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onSaveAsDraft}
            disabled={isLoading || currentStatus === 'draft'}
            className="bg-slate-600 hover:bg-slate-700 gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {locale === 'nl' ? 'Opslaan...' : 'Saving...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {currentStatus === 'draft'
                  ? locale === 'nl'
                    ? 'Al een concept'
                    : 'Already Draft'
                  : locale === 'nl'
                  ? 'Opslaan als concept'
                  : 'Save as Draft'}
              </>
            )}
          </AlertDialogAction>
          <AlertDialogAction
            onClick={onPublish}
            disabled={isLoading || currentStatus === 'published'}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {locale === 'nl' ? 'Publiceren...' : 'Publishing...'}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {currentStatus === 'published'
                  ? locale === 'nl'
                    ? 'Al gepubliceerd'
                    : 'Already Published'
                  : locale === 'nl'
                  ? 'Publiceren'
                  : 'Publish'}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
