'use client';

import { useTranslations } from 'next-intl';

export default function MonthStatsCard() {
  const t = useTranslations('common.proDashboard.werkgebied.statsCard');

  const stats = [
    {
      labelKey: 'quoteRequests',
      value: '24',
    },
    {
      labelKey: 'newLeads',
      value: '18',
    },
    {
      labelKey: 'conversionRate',
      value: '75%',
      highlight: true,
    },
  ];

  return (
    <div className='bg-white rounded-2xl p-4 lg:p-6 border border-neutral-200'>
      <h3 className='text-base lg:text-xl font-semibold text-slate-900 mb-3 lg:mb-4'>{t('title')}</h3>
      <div className='space-y-3 lg:space-y-4'>
        {stats.map((stat, index) => (
          <div key={index} className='flex items-center justify-between'>
            <span className='text-xs lg:text-sm text-slate-600'>{t(stat.labelKey)}</span>
            <span
              className={`text-base lg:text-xl font-bold ${
                stat.highlight ? 'text-accent' : 'text-slate-900'
              }`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}