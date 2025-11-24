'use client';

export default function MonthStatsCard() {
  const stats = [
    {
      label: 'Offerteaanvragen',
      value: '24',
    },
    {
      label: 'Nieuwe leads',
      value: '18',
    },
    {
      label: 'Conversie rate',
      value: '75%',
      highlight: true,
    },
  ];

  return (
    <div className='bg-white rounded-2xl p-6 border border-neutral-200'>
      <h3 className='text-xl font-semibold text-slate-900 mb-4'>Deze maand</h3>
      <div className='space-y-4'>
        {stats.map((stat, index) => (
          <div key={index} className='flex items-center justify-between'>
            <span className='text-sm text-slate-600'>{stat.label}</span>
            <span
              className={`text-xl font-bold ${
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