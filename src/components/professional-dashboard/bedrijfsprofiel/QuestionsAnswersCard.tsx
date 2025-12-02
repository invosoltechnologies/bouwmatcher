'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnswerQuestionModal from './AnswerQuestionModal';

interface Question {
  id: string;
  question: string;
  answer: string | null;
}

interface QuestionsAnswersCardProps {
  questions: Question[];
}

const defaultQuestions: Question[] = [
  {
    id: 'company_start',
    question: 'Hoe bent u begonnen met het bedrijf?',
    answer: null,
  },
  {
    id: 'team_strengths',
    question: 'Wat zijn de pluspunten van uw team?',
    answer: null,
  },
  {
    id: 'customer_advice',
    question: 'Wat is de beste advies voor klanten?',
    answer: null,
  },
];

export default function QuestionsAnswersCard({
  questions = defaultQuestions,
}: QuestionsAnswersCardProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Card className='px-5 gap-4'>
        <CardHeader className='p-0'>
          <CardTitle className='text-lg font-semibold'>Vragen & Antwoord</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='space-y-4'>
            {questions.map((question) => (
              <div
                key={question.id}
                className='border border-gray-200 rounded-xl p-4 space-y-3'
              >
                {/* Question */}
                <h4 className='text-sm font-medium text-secondary-foreground'>
                  {question.question}
                </h4>

                {/* Answer or No Answer State */}
                {question.answer ? (
                  <p className='text-sm text-muted-foreground'>{question.answer}</p>
                ) : (
                  <p className='text-sm text-muted-foreground'>Nog geen antwoord ingediend.</p>
                )}

                {/* Answer Button */}
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleAnswerClick(question)}
                  className='rounded-2xl px-4 py-2 text-sm border-primary text-primary'
                >
                  Beantwoord
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