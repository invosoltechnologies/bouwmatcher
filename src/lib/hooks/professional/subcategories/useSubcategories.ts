'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface ServiceSubcategory {
  id: number;
  slug: string;
  name_nl: string;
  name_en: string;
  service_category_id: number;
  price_particulier?: number;
  price_zakelijk?: number;
  icon_url?: string | null;
}

export interface ProfessionalSubcategory {
  id: string;
  subcategory_id: number;
  created_at: string;
  service_subcategories: ServiceSubcategory;
}

interface SubcategoriesResponse {
  subcategories: ProfessionalSubcategory[];
}

/**
 * Hook to fetch professional's selected subcategories
 * @returns Query result with professional subcategories
 */
export function useSubcategories() {
  return useQuery<SubcategoriesResponse>({
    queryKey: ['professional-subcategories'],
    queryFn: async () => {
      const response = await apiClient.get<SubcategoriesResponse>(
        '/api/professional-subcategories'
      );
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
