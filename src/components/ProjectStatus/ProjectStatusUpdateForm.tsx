'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import QuestionnaireRadio from '@/components/Questionnaire/QuestionnaireRadio';
import { AssignProfessionalModal } from '@/components/modals/AssignProfessionalModal';
import { CancelProjectNoSpecialistModal } from '@/components/modals/CancelProjectNoSpecialistModal';
import { CancelProjectWithSpecialistModal } from '@/components/modals/CancelProjectWithSpecialistModal';
import { ProjectCompletionReviewModal } from '@/components/modals/ProjectCompletionReviewModal';

const ProjectStatusUpdateForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const t = useTranslations('common.projectStatus');

  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignedProfessionalEmail, setAssignedProfessionalEmail] = useState<string | null>(null);
  const [hasLeadPurchases, setHasLeadPurchases] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCancelNoSpecialistModal, setShowCancelNoSpecialistModal] = useState(false);
  const [showCancelWithSpecialistModal, setShowCancelWithSpecialistModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Helper function to determine if a status option should be disabled
  const isStatusDisabled = (statusValue: string): boolean => {
    // Always allow selecting current status
    if (statusValue === currentStatus) return false;

    // Always allow cancelling
    if (statusValue === 'cancelled') return false;

    // Allow going back to pending_quotes from any status except completed
    if (statusValue === 'pending_quotes' && currentStatus !== 'completed') return false;

    // Specialist selected requires at least one lead purchase
    if (statusValue === 'specialist_selected') {
      return !hasLeadPurchases;
    }

    // In progress requires specialist_selected
    if (statusValue === 'in_progress') {
      return currentStatus !== 'specialist_selected';
    }

    // Completed requires in_progress
    if (statusValue === 'completed') {
      return currentStatus !== 'in_progress';
    }

    return false;
  };

  const statusOptions = [
    {
      value: 'pending_quotes',
      label: t('statuses.pending_quotes.label'),
      description: t('statuses.pending_quotes.description'),
      disabled: isStatusDisabled('pending_quotes')
    },
    {
      value: 'specialist_selected',
      label: t('statuses.specialist_selected.label'),
      description: t('statuses.specialist_selected.description'),
      disabled: isStatusDisabled('specialist_selected')
    },
    {
      value: 'in_progress',
      label: t('statuses.in_progress.label'),
      description: t('statuses.in_progress.description'),
      disabled: isStatusDisabled('in_progress')
    },
    {
      value: 'completed',
      label: t('statuses.completed.label'),
      description: t('statuses.completed.description'),
      disabled: isStatusDisabled('completed')
    },
    {
      value: 'cancelled',
      label: t('statuses.cancelled.label'),
      description: t('statuses.cancelled.description'),
      disabled: isStatusDisabled('cancelled')
    }
  ];

  // Fetch current project status and data on mount
  useEffect(() => {
    const fetchCurrentStatus = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const [statusResponse, dataResponse] = await Promise.all([
          fetch(`/api/projects/status?token=${token}`),
          fetch(`/api/projects/data?token=${token}`),
        ]);

        if (!statusResponse.ok) {
          throw new Error('Failed to fetch project status');
        }

        const statusData = await statusResponse.json();
        setSelectedStatus(statusData.status || '');
        setCurrentStatus(statusData.status || '');
        setHasLeadPurchases(statusData.hasLeadPurchases || false);

        // Fetch project data if available
        if (dataResponse.ok) {
          const projectData = await dataResponse.json();
          setProjectId(projectData.id || '');
          setAssignedProfessionalEmail(projectData.professional_email || null);
        }
      } catch (err) {
        console.error('Error fetching current status:', err);
        // Don't show error, just continue with empty selection
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentStatus();
  }, [token]);

  const handleStatusSubmit = async () => {
    if (!token || !projectId) return;

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

    // Client-side validation with user-friendly messages
    if (selectedStatus === 'specialist_selected' && currentStatus === 'pending_quotes' && !hasLeadPurchases) {
      const errorMsg = t('validation.noLeadPurchases');
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (selectedStatus === 'in_progress' && currentStatus !== 'specialist_selected') {
      const errorMsg = t('validation.notSpecialistSelected');
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (selectedStatus === 'completed' && currentStatus !== 'in_progress') {
      const errorMsg = t('validation.notInProgress');
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Handle different status changes with appropriate modals
    if (selectedStatus === 'specialist_selected') {
      setShowAssignModal(true);
      return;
    }

    if (selectedStatus === 'cancelled') {
      if (assignedProfessionalEmail) {
        setShowCancelWithSpecialistModal(true);
      } else {
        setShowCancelNoSpecialistModal(true);
      }
      return;
    }

    if (selectedStatus === 'completed') {
      setShowCompletionModal(true);
      return;
    }

    // For other status changes, directly update
    await handleStatusSubmit();
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex flex-col bg-white'>
        <main className='flex-1 flex items-center justify-center px-4 py-6'>
          <div className='text-center'>
            <p className='text-lg text-gray-500'>{t('loading')}</p>
          </div>
        </main>
      </div>
    );
  }

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
                  disabled={option.disabled}
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

      {/* Modals */}
      {projectId && token && (
        <>
          <AssignProfessionalModal
            isOpen={showAssignModal}
            onClose={() => setShowAssignModal(false)}
            projectId={projectId}
            accessToken={token}
            onSuccess={handleStatusSubmit}
          />

          <CancelProjectNoSpecialistModal
            isOpen={showCancelNoSpecialistModal}
            onClose={() => setShowCancelNoSpecialistModal(false)}
            projectId={projectId}
            accessToken={token}
            onSuccess={handleStatusSubmit}
          />

          {assignedProfessionalEmail && (
            <CancelProjectWithSpecialistModal
              isOpen={showCancelWithSpecialistModal}
              onClose={() => setShowCancelWithSpecialistModal(false)}
              projectId={projectId}
              accessToken={token}
              professionalEmail={assignedProfessionalEmail}
              onSuccess={handleStatusSubmit}
            />
          )}

          <ProjectCompletionReviewModal
            isOpen={showCompletionModal}
            onClose={() => setShowCompletionModal(false)}
            projectId={projectId}
            accessToken={token}
            professionalEmail={assignedProfessionalEmail || ''}
            onSuccess={handleStatusSubmit}
          />
        </>
      )}
    </div>
  );
};

export default ProjectStatusUpdateForm;
