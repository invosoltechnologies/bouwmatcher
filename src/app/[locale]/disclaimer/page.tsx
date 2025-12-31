import DisclaimerDescription from "@/components/Legal/DisclaimerDescription";
import HeroLegal from "@/components/Legal/HeroLegal";
import DefaultLayout from "@/components/DefaultLayout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Bouw Matcher',
  description: 'Read our disclaimer to understand the terms and limitations of using Bouw Matcher services.',
};

export default function DisclaimerPage() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <DisclaimerDescription />
    </DefaultLayout>
  );
}
