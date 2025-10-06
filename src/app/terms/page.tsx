import HeroLegal from "@/components/Legal/HeroLegal";
import TermsDescription from "@/components/Legal/TermsDescription";
import DefaultLayout from "@/components/DefaultLayout";

export default function TermsPage() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <TermsDescription/>
    </DefaultLayout>
  );
}
