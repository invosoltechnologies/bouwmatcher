import { Suspense } from 'react';
import OfferteaanvragenPageClient from '@/components/professional-dashboard/offerteaanvragen/OfferteaanvragenPageClient';

export default function OfferteaanvragenPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    }>
      <OfferteaanvragenPageClient />
    </Suspense>
  );
}
