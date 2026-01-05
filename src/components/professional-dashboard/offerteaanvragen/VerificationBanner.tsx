'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAccount } from '@/lib/hooks/professional/account';
import { useCreateVerificationRequest } from '@/lib/hooks/admin/verification-requests';
import toast from 'react-hot-toast';

export default function VerificationBanner() {
  const t = useTranslations('common.proDashboard.offerteaanvragen.verificationBanner');
  const { data: accountData } = useAccount();
  const createVerificationRequest = useCreateVerificationRequest();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerificationClick = async () => {
    if (!accountData?.accountData?.professionalProfileId) {
      toast.error('Professional profile not found');
      return;
    }

    setIsSubmitting(true);
    try {
      await createVerificationRequest.mutateAsync({
        professional_id: accountData.accountData.professionalProfileId,
        company_id: accountData.accountData.companyInfo?.companyId,
        notes: 'Verification request submitted from leads page',
      });

      toast.success('Verificatieverzoek ingediend! Onze team zal dit binnenkort beoordelen.');
    } catch (error: any) {
      if (error.message?.includes('already pending')) {
        toast.error('Er is al een verificatieverzoek in behandeling');
      } else {
        toast.error('Fout bij het indienen van verificatieverzoek');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className='rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border border-amber-200'
      style={{
        background:
          'linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)',
      }}
    >
      <div className='flex items-start gap-3'>
        <AlertCircle className='w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5' />
        <div className='flex-1'>
          <h2 className='text-base sm:text-lg font-semibold leading-snug text-secondary-foreground mb-2'>
            {t('title')}
          </h2>
          <p className='text-sm sm:text-base text-muted-foreground leading-snug mb-3 sm:mb-4 max-w-2xl'>
            {t('description')}
          </p>
          <Button
            onClick={handleVerificationClick}
            disabled={isSubmitting || createVerificationRequest.isPending}
            className='w-full sm:w-auto py-3 sm:py-3.5 rounded-xl text-sm sm:text-base bg-amber-600 hover:bg-amber-700'
          >
            {isSubmitting || createVerificationRequest.isPending ? 'Bezig...' : t('completeButton')}
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </div>
    </div>
  );
}
