'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAccount } from '@/lib/hooks/professional/account';
import { useCreateVerificationRequest } from '@/lib/hooks/admin/verification-requests';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function VerificationBanner() {
  const t = useTranslations('common.proDashboard.offerteaanvragen.verificationBanner');
  const { data: accountData } = useAccount();
  const createVerificationRequest = useCreateVerificationRequest();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const accountStatus = accountData?.accountData?.accountStatus;
  const isSuspended = accountStatus?.status === 'suspended';
  const isPending = accountStatus?.statusCode === 2; // 2 = pending/in_review
  const isInReview = accountStatus?.statusKey === 'inReview';

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

  const handleContactAdmin = () => {
    // Navigate to contact page or open contact modal
    router.push('/contact');
  };

  // Show suspended/blocked banner
  if (isSuspended) {
    return (
      <div
        className='rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border border-red-200'
        style={{
          background:
            'linear-gradient(90deg, rgba(239, 68, 68, 0.05) 0%, rgba(185, 28, 28, 0.05) 100%)',
        }}
      >
        <div className='flex items-start gap-3'>
          <XCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
          <div className='flex-1'>
            <h2 className='text-base sm:text-lg font-semibold leading-snug text-red-900 mb-2'>
              Account Geschorst
            </h2>
            <p className='text-sm sm:text-base text-red-700 leading-snug mb-3 sm:mb-4 max-w-2xl'>
              Je account is tijdelijk geschorst. Neem contact op met onze beheerder voor meer informatie of om een verzoek in te dienen om de schorsing op te heffen.
            </p>
            <Button
              onClick={handleContactAdmin}
              className='w-full sm:w-auto py-3 sm:py-3.5 rounded-xl text-sm sm:text-base bg-red-600 hover:bg-red-700'
            >
              Contact met beheerder
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show pending/in review banner
  if (isPending || isInReview) {
    return (
      <div
        className='rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border border-blue-200'
        style={{
          background:
            'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
        }}
      >
        <div className='flex items-start gap-3'>
          <AlertCircle className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
          <div className='flex-1'>
            <h2 className='text-base sm:text-lg font-semibold leading-snug text-blue-900 mb-2'>
              {t('inTreatment.title')}
            </h2>
            <p className='text-sm sm:text-base text-blue-700 leading-snug max-w-2xl'>
              {t('inTreatment.description')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show default not verified banner
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
