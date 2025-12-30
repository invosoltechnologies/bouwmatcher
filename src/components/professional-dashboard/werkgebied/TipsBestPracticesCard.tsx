'use client';

import { useTranslations } from 'next-intl';
import { Target, Tag, Lightbulb, TrendingUp, RefreshCw } from 'lucide-react';

export default function TipsBestPracticesCard() {
  const t = useTranslations('common.proDashboard.werkgebied.tipsCard');

  const tips = [
    {
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      icon: Tag,
      color: 'bg-accent',
    },
    {
      icon: Lightbulb,
      color: 'bg-blue-500',
    },
    {
      icon: TrendingUp,
      color: 'bg-accent',
    },
    {
      icon: RefreshCw,
      color: 'bg-accent',
    },
  ];

  return (
    <div className='bg-white rounded-2xl p-4 lg:p-6 border border-neutral-200'>
      <h3 className='text-base lg:text-xl font-semibold text-slate-900 mb-3 lg:mb-4'>
        {t('title')}
      </h3>
      <div className='space-y-3 lg:space-y-4'>
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div key={index} className='flex items-start gap-2 lg:gap-3'>
              <div className={`${tip.color} rounded-full p-1.5 lg:p-2 shrink-0`}>
                <Icon className='w-4 h-4 lg:w-5 lg:h-5 text-white' />
              </div>
              <p className='text-xs lg:text-sm text-slate-700 leading-relaxed'>{t(`tips.${index}`)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}