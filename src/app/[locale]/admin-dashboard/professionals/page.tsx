'use client';

import { useMemo } from 'react';
import ProfessionalsTable from '@/components/admin-dashboard/ProfessionalsTable';
import { useProfessionals } from '@/lib/hooks/admin/professionals';
import { useTranslations } from 'next-intl';

export default function ProfessionalsPage() {
  const t = useTranslations('common.adminDashboard');
  const { data, isLoading, error } = useProfessionals({
    limit: 50,
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  // Transform API response to table format
  const transformedProfessionals = useMemo(() => {
    if (!data?.professionals) return [];

    return data.professionals.map((professional) => ({
      id: professional.id,
      name: `${professional.first_name} ${professional.last_name}`,
      email: professional.email,
      avatar: professional.profile_picture_url,
      categories: professional.specializations || [],
      status: professional.status,
      rating: professional.rating,
      reviewCount: professional.review_count,
      registeredAt: new Date(professional.created_at).toISOString().split('T')[0],
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="text-center py-12">
          <p className="text-slate-500">Bezig met laden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Fout bij het laden van professionals</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <ProfessionalsTable
        professionals={transformedProfessionals}
        onViewProfile={(id) => console.log('View profile:', id)}
      />
    </div>
  );
}
