import { Suspense } from 'react';
import DefaultLayout from "@/components/DefaultLayout";
import ProjectStatusUpdateForm from "@/components/ProjectStatus/ProjectStatusUpdateForm";

function UpdateFormLoading() {
  return (
    <div className='w-full max-w-[620px] mx-auto pt-[196px] pb-24'>
      <div className='text-center'>
        <p className='text-lg text-gray-500'>Loading...</p>
      </div>
    </div>
  );
}

export default function ProjectStatusUpdate() {
  return (
    <DefaultLayout>
      <Suspense fallback={<UpdateFormLoading />}>
        <ProjectStatusUpdateForm />
      </Suspense>
    </DefaultLayout>
  );
}
