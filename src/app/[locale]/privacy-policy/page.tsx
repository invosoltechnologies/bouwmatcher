import HeroLegal from "@/components/Legal/HeroLegal";
import PrivacyDescription from "@/components/Legal/PrivacyDescription";
import DefaultLayout from "@/components/DefaultLayout";

export default function PrivacyPolicy() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <PrivacyDescription/>
    </DefaultLayout>
  );
}
