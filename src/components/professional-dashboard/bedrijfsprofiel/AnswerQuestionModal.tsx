'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
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
  const [answer, setAnswer] = useState(question.answer || '');

  const updateAnswersMutation = useUpdateProfileAnswers({
    onSuccess: () => {
      toast.success('Antwoord succesvol opgeslagen');
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || 'Kon antwoord niet opslaan');
    },
  });

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast.error('Vul een antwoord in');
      return;
    }

    updateAnswersMutation.mutate({
      questionId: question.id,
      answer: answer.trim(),
    });
  };

  const isLoading = updateAnswersMutation.isPending;

  return (
    <GlassyModal isOpen={isOpen} onClose={onClose} title='Vragen & Antwoord' className='max-w-md'>
      <div className='space-y-6'>
        {/* Question */}
        <div>
          <h3 className='text-sm font-medium text-secondary-foreground mb-4'>
            {question.question}
          </h3>
        </div>

        {/* Answer Textarea */}
        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isLoading}
            className='w-full min-h-32 p-3 border border-gray-300 rounded-xl text-sm text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none'
            placeholder='Typ hier uw antwoord...'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3'>
          <Button
            type='button'
            variant='ghost'
            onClick={onClose}
            disabled={isLoading}
            className='rounded-xl text-primary'
          >
            Annuleren
          </Button>
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isLoading}
            className='rounded-xl bg-primary hover:bg-primary/90 text-white'
          >
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Opslaan...
              </>
            ) : (
              'Opslaan'
            )}
          </Button>
        </div>
      </div>
    </GlassyModal>
  );
}