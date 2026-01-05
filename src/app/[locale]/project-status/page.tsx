import { Suspense } from 'react';
import DefaultLayout from "@/components/DefaultLayout";
import FAQSection from '@/components/Homepage/FAQSection';
import ProjectStatusDetails from "@/components/ProjectStatus/ProjectStatusDetails";

function ProjectStatusLoading() {
  return (
    <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
      <div className='text-center'>
        <p className='text-lg text-gray-500'>Loading...</p>
      </div>
    </div>
  );
}

export default function ProjectStatus() {
  return (
    <DefaultLayout>
      <Suspense fallback={<ProjectStatusLoading />}>
        <ProjectStatusDetails/>
      </Suspense>
      <FAQSection/>
    </DefaultLayout>
  );
}
