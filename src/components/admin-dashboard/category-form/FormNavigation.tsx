'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  onCancel: () => void;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  nextLabel?: string;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onCancel,
  isNextDisabled = false,
  isNextLoading = false,
  nextLabel,
}: FormNavigationProps) {
  const t = useTranslations('common.adminDashboard.categoryForm.navigation');
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const defaultNextLabel = isLastStep ? t('complete') : t('next');
  const displayNextLabel = nextLabel || defaultNextLabel;

  return (
    <div className="flex items-center justify-between pt-6 border-t">
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('cancel')}
        </Button>

        {!isFirstStep && onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('previous')}
          </Button>
        )}
      </div>

      {onNext && (
        <Button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled || isNextLoading}
          className="min-w-[120px]"
        >
          {isNextLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              {t('saving')}
            </span>
          ) : (
            <>
              {displayNextLabel}
              {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
