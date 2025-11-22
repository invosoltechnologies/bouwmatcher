'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Info } from 'lucide-react';

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
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>Reviews</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Info Banner */}
        <div className='bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3'>
          <Info className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
          <p className='text-sm text-secondary-foreground'>
            0 overnameprojectvrouw met zijn prijsbeleid worden verstaan by Taar
            opgewachtheid. Het ontvangen van minimaal 1 review zorgt ervoor dat je profiel
            beter zichtbaar is.
          </p>
        </div>

        {/* Request Review Button */}
        <Button
          onClick={handleRequestReview}
          className='w-full rounded-xl bg-accent hover:bg-accent/90'
          size='lg'
        >
          Vraag review aan
        </Button>

        {/* No Reviews Placeholder */}
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <div className='w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4'>
            <Star className='w-8 h-8 text-slate-400' />
          </div>
          <p className='text-sm text-muted-foreground'>Geen reviews</p>
        </div>

        {/* Vragen & Antwoord Section */}
        <div className='border-t pt-6'>
          <h3 className='text-base font-semibold mb-4'>Vragen & Antwoord</h3>
          <div className='space-y-3'>
            {questions.map((question) => (
              <div
                key={question.id}
                className='flex items-start justify-between gap-4 pb-3 border-b last:border-b-0'
              >
                <p className='text-sm text-secondary-foreground flex-1'>{question.text}</p>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleAnswerQuestion(question.id)}
                  className='rounded-xl text-xs whitespace-nowrap'
                >
                  Beantwoord
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
