import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "@/components/providers/Providers";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    nl: "Bouwmatcher - Vind en vergelijk vertrouwde professionals",
    en: "Bouwmatcher - Find and compare trusted professionals"
  };

  const descriptions = {
    nl: "Het vertrouwde platform voor het matchen van bouwers en projecten",
    en: "The trusted platform for matching builders and projects"
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.nl,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.nl,
    alternates: {
      languages: {
        'nl': '/nl',
        'en': '/en',
        'x-default': '/nl'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.nl,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.nl,
      locale: locale,
      alternateLocale: locale === 'nl' ? ['en'] : ['nl'],
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
