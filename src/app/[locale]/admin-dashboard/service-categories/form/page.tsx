'use client';

import { Suspense, use } from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryMultiStepForm from '@/components/admin-dashboard/category-form/CategoryMultiStepForm';

function CategoryFormContent({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams.get('id');
  const categoryId = categoryIdParam ? parseInt(categoryIdParam, 10) : null;

  return <CategoryMultiStepForm categoryId={categoryId} locale={locale} />;
}

export default function CategoryFormPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  return (
    <div className="p-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Laden...</p>
            </div>
          </div>
        }
      >
        <CategoryFormContent locale={locale} />
      </Suspense>
    </div>
  );
}
