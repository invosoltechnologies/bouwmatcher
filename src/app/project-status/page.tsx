
import DefaultLayout from "@/components/DefaultLayout";
import FAQSection from '@/components/Homepage/FAQSection';
import ProjectStatusDetails from "@/components/ProjectStatus/ProjectStatusDetails";

export default function ProjectStatus() {
  return (
    <DefaultLayout>
      <ProjectStatusDetails/>
      <FAQSection/>
    </DefaultLayout>
  );
}
