'use client';

import { useTranslations } from 'next-intl';

export default function TopBar() {
  const t = useTranslations('common.topbar');

  return (
    <section className="bg-primary py-2 md:py-3">
      <div className="container mx-auto px-4">
        <p className="text-primary-foreground text-center text-xs md:text-sm leading-none font-display font-medium tracking-normal">
          {t('message')}
        </p>
      </div>
    </section>
  );
}