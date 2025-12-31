import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  // Get the accept-language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // Simple language detection - check if English is preferred
  const preferredLocale = acceptLanguage.toLowerCase().includes('en') &&
                          !acceptLanguage.toLowerCase().startsWith('nl')
                          ? 'en'
                          : 'nl';

  // Redirect to detected or default locale
  redirect(`/${preferredLocale}`);
}
