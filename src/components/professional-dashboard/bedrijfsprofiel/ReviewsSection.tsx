'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Shield } from 'lucide-react';

export default function ReviewsSection() {
  const handleRequestReview = () => {
    // TODO: Implement request review functionality
    console.log('Request review');
  };

  const handleAnswerQuestion = (questionId: string) => {
    // TODO: Implement answer question functionality
    console.log('Answer question:', questionId);
  };

  const questions = [
    { id: '1', text: 'Hoe bent u begonnen met het bedrijf?' },
    { id: '2', text: 'Wat zijn de olieprezen met uw bedrijf?' },
    { id: '3', text: 'Hoe is de kwalsa advies over klanten?' },
  ];

  return (
    <>
      {/* Reviews Card */}
      <Card className='px-5 gap-4'>
        <CardHeader className='p-0'>
          <CardTitle className='text-lg font-semibold'>Reviews</CardTitle>
        </CardHeader>
        <CardContent className='p-0 space-y-6'>
          {/* Info Banner */}
          <div className='bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3'>
            <Shield className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
            <p className='text-sm text-secondary-foreground'>
              In overeenstemming met ons privacybeleid worden reviews na 1 jaar
              geanonimiseerd.
            </p>
          </div>

          {/* No Reviews Placeholder */}
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4'>
              <Star className='w-8 h-8 text-slate-400' />
            </div>
            <p className='text-sm text-muted-foreground'>Geen reviews</p>
          </div>

          {/* Request Review Button with Background Strip */}
          <div className='bg-emerald-50 rounded-xl p-4 -mx-6 -mb-6'>
            <Button
              onClick={handleRequestReview}
              className='w-full rounded-xl bg-accent hover:bg-accent/90 text-white'
              size='lg'
            >
              Vraag reviews aan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vragen & Antwoord Card - SEPARATE */}
      <Card className='px-5 gap-4'>
        <CardHeader className='p-0'>
          <CardTitle className='text-lg font-semibold'>
            Vragen & Antwoord
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='space-y-4'>
            {questions.map((question) => (
              <div
                key={question.id}
                className='flex items-start justify-between gap-4 pb-4 border-b last:border-b-0 last:pb-0'
              >
                <p className='text-sm text-secondary-foreground flex-1'>
                  {question.text}
                </p>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleAnswerQuestion(question.id)}
                  className='rounded-xl text-xs whitespace-nowrap border-primary text-primary hover:bg-primary/5'
                >
                  Beantwoord
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
