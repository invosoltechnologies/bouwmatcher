'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

type Locale = 'nl' | 'en';
const locales: readonly Locale[] = ['nl', 'en'] as const;

export default function LanguageSwitcher() {
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
    <div className='flex items-center'>
      <div
        className='bg-[#F8F8F8] border border-gray-200 rounded-lg p-1 flex'
        style={{ borderRadius: '8px' }}
      >
        {locales.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            className={`px-4 py-2 text-sm font-medium cursor-pointer transition-all ${
              locale === lang
                ? 'bg-white text-primary border border-[#EFEFEF] rounded-md'
                : 'text-gray-600'
            }`}
            style={{
              borderRadius: '6px',
              boxShadow: locale === lang ? '0px 1px 2px 0px #0000000D' : 'none'
            }}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}