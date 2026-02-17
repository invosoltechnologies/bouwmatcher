'use client';

import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import GlassyModal from '@/components/ui/glassy-modal';

interface VerificationInProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminEmail?: string;
}

export default function VerificationInProgressModal({
  isOpen,
  onClose,
  adminEmail = 'support@bouwmatcher.be',
}: VerificationInProgressModalProps) {
  const t = useTranslations('common.proDashboard.offerteaanvragen.leadDetails.verificationInProgressModal');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(adminEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassyModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('title')}
    >
      {/* Description */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* Admin Contact Section */}
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            {t('adminContactLabel')}
          </p>

          {/* Email Display with Copy */}
          <div className="flex items-center gap-2 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 break-all">
                {adminEmail}
              </p>
            </div>
            <Button
              onClick={handleCopyEmail}
              variant="ghost"
              className="flex-shrink-0 hover:bg-primary text-blue-600 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="ml-1 text-xs">{t('copiedButton')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="ml-1 text-xs">{t('copyButton')}</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3 pt-2">
          {/* <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
            <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
            <p className="text-xs sm:text-sm text-blue-900">
              Include your professional profile ID in your message for faster support
            </p>
          </div> */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
            <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
            <p className="text-xs sm:text-sm text-blue-900">
              {t('expectedResponseTime')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200 mt-6 -mx-6 px-6">
        <Button
          onClick={onClose}
          
        >
          {t('closeButton')}
        </Button>
      </div>
    </GlassyModal>
  );
}
