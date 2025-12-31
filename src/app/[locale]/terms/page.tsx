import HeroLegal from "@/components/Legal/HeroLegal";
import TermsDescription from "@/components/Legal/TermsDescription";
import DefaultLayout from "@/components/DefaultLayout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Bouw Matcher',
  description: 'Review the terms and conditions for using Bouw Matcher platform and services.',
};

export default function TermsPage() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <TermsDescription/>
    </DefaultLayout>
  );
}
