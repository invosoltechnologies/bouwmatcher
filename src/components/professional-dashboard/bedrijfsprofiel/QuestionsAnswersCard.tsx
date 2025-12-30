'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import AnswerQuestionModal from './AnswerQuestionModal';

interface Question {
  id: string;
  question: string;
  answer: string | null;
}

interface QuestionsAnswersCardProps {
  questions: Question[];
}

export default function QuestionsAnswersCard({
  questions,
}: QuestionsAnswersCardProps) {
  const t = useTranslations('common.proDashboard.bedrijfsprofiel.questions');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultQuestions: Question[] = [
    {
      id: 'company_start',
      question: t('defaultQuestions.companyStart'),
      answer: null,
    },
    {
      id: 'team_strengths',
      question: t('defaultQuestions.teamStrengths'),
      answer: null,
    },
    {
      id: 'customer_advice',
      question: t('defaultQuestions.customerAdvice'),
      answer: null,
    },
  ];

  const displayQuestions = questions || defaultQuestions;

  const handleAnswerClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <>
      <Card className='px-4 sm:px-5 gap-3 sm:gap-4'>
        <CardHeader className='p-0'>
          <CardTitle className='text-base sm:text-lg lg:text-xl font-semibold'>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='space-y-3 sm:space-y-4'>
            {displayQuestions.map((question) => (
              <div
                key={question.id}
                className='border border-gray-200 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3'
              >
                {/* Question */}
                <h4 className='text-sm sm:text-base font-medium text-secondary-foreground'>
                  {question.question}
                </h4>

                {/* Answer or No Answer State */}
                {question.answer ? (
                  <p className='text-xs sm:text-sm text-muted-foreground'>{question.answer}</p>
                ) : (
                  <p className='text-xs sm:text-sm text-muted-foreground'>{t('noAnswer')}</p>
                )}

                {/* Answer Button */}
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleAnswerClick(question)}
                  className='w-full sm:w-auto rounded-2xl px-4 py-2 text-xs sm:text-sm border-primary text-primary'
                >
                  {t('answer')}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Answer Question Modal */}
      {selectedQuestion && (
        <AnswerQuestionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          question={selectedQuestion}
        />
      )}
    </>
  );
}