'use client';

import { Target, Tag, Lightbulb, TrendingUp, RefreshCw } from 'lucide-react';

export default function TipsBestPracticesCard() {
  const tips = [
    {
      icon: Target,
      text: 'Maak een keuze uit meerdere regio\'s om nieuwe klanten te werven',
      color: 'bg-blue-500',
    },
    {
      icon: Tag,
      text: 'Kies uiteenlopende rubrieken per regio om je bereik te maximaliseren',
      color: 'bg-accent',
    },
    {
      icon: Lightbulb,
      text: 'Update je vakgebieden regelmatig op basis van seizoensgebonden vraag',
      color: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      text: 'Monitor je prestaties per vakgebied in het overzicht',
      color: 'bg-accent',
    },
    {
      icon: RefreshCw,
      text: 'Update de status regelmatig voor klanten.',
      color: 'bg-accent',
    },
  ];

  return (
    <div className='bg-white rounded-2xl p-6 border border-neutral-200'>
      <h3 className='text-xl font-semibold text-slate-900 mb-4'>
        Tips & Best Practices
      </h3>
      <div className='space-y-4'>
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className='flex items-start gap-3'>
              <div className={`${tip.color} rounded-full p-2 shrink-0`}>
                <Icon className='w-5 h-5 text-white' />
              </div>
              <p className='text-sm text-slate-700 leading-relaxed'>{tip.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}