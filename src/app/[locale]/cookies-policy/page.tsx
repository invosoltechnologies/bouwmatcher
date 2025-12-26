import CookiesDescription from "@/components/Legal/CookiesDescription";
import HeroLegal from "@/components/Legal/HeroLegal";
import DefaultLayout from "@/components/DefaultLayout";

export default function CookiesPolicyPage() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <CookiesDescription />
    </DefaultLayout>
  );
}
