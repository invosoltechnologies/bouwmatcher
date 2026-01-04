'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import QuestionnaireRadio from '@/components/Questionnaire/QuestionnaireRadio';

const ProjectStatusUpdateForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const t = useTranslations('common.projectStatus');

  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statusOptions = [
    {
      value: 'pending_quotes',
      label: t('statuses.pending_quotes.label'),
      description: t('statuses.pending_quotes.description')
    },
    {
      value: 'specialist_selected',
      label: t('statuses.specialist_selected.label'),
      description: t('statuses.specialist_selected.description')
    },
    {
      value: 'in_progress',
      label: t('statuses.in_progress.label'),
      description: t('statuses.in_progress.description')
    },
    {
      value: 'completed',
      label: t('statuses.completed.label'),
      description: t('statuses.completed.description')
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStatus) {
      setError(t('validation.selectStatus'));
      return;
    }

    if (!token) {
      setError(t('validation.invalidToken'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/status?token=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || t('errors.failedToUpdate'));
      }

      await response.json();
      toast.success(t('messages.success'));

      // Redirect back to project status page after 1 second
      setTimeout(() => {
        router.push(`/project-status?token=${token}`);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('errors.failedToUpdate');
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error updating status:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {/* Main Content */}
      <main className='flex-1 flex items-center justify-center px-4 py-6 md:px-7 md:py-12 md:pt-48'>
        <div className='w-full max-w-[680px]'>
          {/* Header */}
          <h2 className='text-2xl md:text-4xl font-normal leading-10 text-center text-foreground mb-8'>
            {t('title')}
          </h2>

          {/* Error Message */}
          {error && (
            <div className='mb-8 p-4 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-sm text-red-600'>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Status Options */}
            <RadioGroup value={selectedStatus} onValueChange={setSelectedStatus} className='space-y-1 md:space-y-4'>
              {statusOptions.map((option) => (
                <QuestionnaireRadio
                  key={option.value}
                  id={option.value}
                  name='status'
                  value={option.value}
                  label={option.label}
                  description={option.description}
                  checked={selectedStatus === option.value}
                />
              ))}
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className='flex items-center justify-between pt-6'>
              <Button
                type='button'
                variant='ghost'
                onClick={() => router.back()}
                className='text-primary font-medium text-sm md:text-base flex items-center gap-2'
              >
                <ArrowLeft className='w-4 h-4 md:w-5 md:h-5' />
                {t('buttons.back')}
              </Button>

              <Button
                type='submit'
                disabled={!selectedStatus || isSubmitting}
                className='bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 md:text-base md:px-8 md:py-4 rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? t('buttons.updating') : t('buttons.updateStatus')}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProjectStatusUpdateForm;
