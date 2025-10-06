import DisclaimerDescription from "@/components/Legal/DisclaimerDescription";
import HeroLegal from "@/components/Legal/HeroLegal";
import DefaultLayout from "@/components/DefaultLayout";

export default function DisclaimerPage() {
  return (
    <DefaultLayout>
      <HeroLegal />
      <DisclaimerDescription />
    </DefaultLayout>
  );
}
