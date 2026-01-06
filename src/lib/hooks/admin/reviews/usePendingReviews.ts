import { useQuery } from '@tanstack/react-query';
import type { CompanyRating } from '@/lib/types/account';

export interface Professional {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Company {
  id: string;
  company_name: string;
}

export interface PendingReview extends CompanyRating {
  professional?: Professional;
  company?: Company;
  professional_name?: string;
  professional_email?: string;
  company_name?: string;
  reviewer_name?: string;
  project_owner_name?: string;
  project?: {
    id: string;
    first_name?: string;
    last_name?: string;
    personal_user_id?: string;
  };
}

export interface PendingReviewsResponse {
  reviews: PendingReview[];
  total: number;
  limit: number;
  offset: number;
}

const reviewKeys = {
  all: ['adminReviews'] as const,
  pending: () => ['adminReviews', 'pending'] as const,
  pendingPaginated: (limit: number, offset: number) =>
    ['adminReviews', 'pending', limit, offset] as const,
};

async function fetchPendingReviews(
  limit: number = 20,
  offset: number = 0
): Promise<PendingReviewsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const response = await fetch(`/api/admin/reviews/pending?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch pending reviews');
  }

  return response.json();
}

export function usePendingReviews(limit: number = 20, offset: number = 0) {
  return useQuery<PendingReviewsResponse, Error>({
    queryKey: reviewKeys.pendingPaginated(limit, offset),
    queryFn: () => fetchPendingReviews(limit, offset),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
