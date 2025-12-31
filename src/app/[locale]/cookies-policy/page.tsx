import CookiesDescription from "@/components/Legal/CookiesDescription";
import HeroLegal from "@/components/Legal/HeroLegal";
import DefaultLayout from "@/components/DefaultLayout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Policy | Bouw Matcher',
  description: 'Learn about how Bouw Matcher uses cookies and similar technologies on our website.',
};

export default function CookiesPolicyPage() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <CookiesDescription />
    </DefaultLayout>
  );
}
