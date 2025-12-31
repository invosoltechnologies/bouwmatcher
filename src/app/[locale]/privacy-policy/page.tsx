import HeroLegal from "@/components/Legal/HeroLegal";
import PrivacyDescription from "@/components/Legal/PrivacyDescription";
import DefaultLayout from "@/components/DefaultLayout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bouw Matcher',
  description: 'Learn how Bouw Matcher collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <PrivacyDescription/>
    </DefaultLayout>
  );
}
