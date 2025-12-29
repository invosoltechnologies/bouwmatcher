'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

type Locale = 'nl' | 'en';
const locales: readonly Locale[] = ['nl', 'en'] as const;

export default function SidebarLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: Locale) => {
    if (locale === newLocale) return;

    // The router from next-intl navigation automatically handles locale switching
    // pathname from usePathname() is already without the locale prefix
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        className="bg-slate-50 border border-slate-200 rounded-full p-1 flex gap-1"
      >
        {locales.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            className={`px-4 cursor-pointer py-2 text-sm font-medium rounded-full transition-all ${
              locale === lang
                ? 'bg-white text-primary shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
