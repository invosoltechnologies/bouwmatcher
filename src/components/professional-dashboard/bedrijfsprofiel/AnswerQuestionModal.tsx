'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import GlassyModal from '@/components/ui/glassy-modal';
import { Loader2 } from 'lucide-react';
import { useUpdateProfileAnswers } from '@/lib/hooks/professional/account/useProfileAnswers';

interface Question {
  id: string;
  question: string;
  answer: string | null;
}

interface AnswerQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
}

export default function AnswerQuestionModal({
  isOpen,
  onClose,
  question,
}: AnswerQuestionModalProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.modals.answerQuestion');
  const [answer, setAnswer] = useState(question.answer || '');

  const updateAnswersMutation = useUpdateProfileAnswers({
    onSuccess: () => {
      toast.success(t('success'));
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || t('error'));
    },
  });

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast.error(t('validationError'));
      return;
    }

    updateAnswersMutation.mutate({
      questionId: question.id,
      answer: answer.trim(),
    });
  };

  const isLoading = updateAnswersMutation.isPending;

  return (
    <GlassyModal isOpen={isOpen} onClose={onClose} title={t('title')} className='max-w-sm sm:max-w-md'>
      <div className='space-y-4 sm:space-y-6 p-4 sm:p-6'>
        {/* Question */}
        <div>
          <h3 className='text-sm sm:text-base font-medium text-secondary-foreground mb-4'>
            {question.question}
          </h3>
        </div>

        {/* Answer Textarea */}
        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isLoading}
            className='w-full min-h-[100px] sm:min-h-32 p-3 border border-gray-300 rounded-xl text-sm sm:text-base text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none'
            placeholder={t('placeholder')}
          />
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-end gap-3'>
          <Button
            type='button'
            variant='ghost'
            onClick={onClose}
            disabled={isLoading}
            className='w-full sm:w-auto rounded-xl text-primary py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base'
          >
            {t('cancel')}
          </Button>
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isLoading}
            className='w-full sm:w-auto rounded-xl bg-primary hover:bg-primary/90 text-white py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base'
          >
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin' />
                {t('saving')}
              </>
            ) : (
              t('save')
            )}
          </Button>
        </div>
      </div>
    </GlassyModal>
  );
}