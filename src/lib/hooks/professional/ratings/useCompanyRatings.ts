/**
 * useCompanyRatings Hook
 * Fetches ratings for a specific company
 */

import { useQuery } from '@tanstack/react-query';
import type { CompanyRating, CompanyRatingSummary } from '@/lib/types/account';

export const ratingKeys = {
  all: ['companyRatings'] as const,
  company: (companyId: string) => ['companyRatings', companyId] as const,
  userRating: (companyId: string, profileId: string) =>
    ['companyRatings', companyId, profileId] as const,
};

interface CompanyRatingsResponse {
  ratings: CompanyRating[];
  summary: CompanyRatingSummary;
}

async function fetchCompanyRatings(
  companyId: string
): Promise<CompanyRatingsResponse> {
  const response = await fetch(`/api/companies/${companyId}/ratings`);

  if (!response.ok) {
    throw new Error('Failed to fetch ratings');
  }

  return response.json();
}

export function useCompanyRatings(companyId: string) {
  return useQuery<CompanyRatingsResponse, Error>({
    queryKey: ratingKeys.company(companyId),
    queryFn: () => fetchCompanyRatings(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
