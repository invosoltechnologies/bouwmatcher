import { Suspense } from 'react';
import CreateProjectContent from '@/components/CreateProject/CreateProjectContent';

export default function CreateProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-lg text-gray-500">Laden...</p></div>}>
      <CreateProjectContent />
    </Suspense>
  );
}
