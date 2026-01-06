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

export interface Review extends CompanyRating {
  professional?: Professional;
  company?: Company;
  professional_name?: string;
  professional_email?: string;
  company_name?: string;
  reviewer_name?: string;
  project_owner_name?: string;
  category_name?: string;
  subcategory_name?: string;
  category_id?: number;
  subcategory_id?: number;
  project?: {
    id: string;
    first_name?: string;
    last_name?: string;
    personal_user_id?: string;
    service_category_id?: number;
    subcategory_id?: number;
    service_category?: {
      id: number;
      name_nl?: string;
      name_en?: string;
    };
    subcategory?: {
      id: number;
      name_nl?: string;
      name_en?: string;
    };
  };
}

export interface AllReviewsResponse {
  reviews: Review[];
  total: number;
  limit: number;
  offset: number;
}

const reviewKeys = {
  all: ['adminAllReviews'] as const,
  allPaginated: (limit: number, offset: number, status?: string) =>
    ['adminAllReviews', limit, offset, status] as const,
};

async function fetchAllReviews(
  limit: number = 20,
  offset: number = 0,
  status?: string
): Promise<AllReviewsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  if (status) {
    params.append('status', status);
  }

  const response = await fetch(`/api/admin/reviews/all?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  return response.json();
}

export function useAllReviews(
  limit: number = 20,
  offset: number = 0,
  status?: string
) {
  return useQuery<AllReviewsResponse, Error>({
    queryKey: reviewKeys.allPaginated(limit, offset, status),
    queryFn: () => fetchAllReviews(limit, offset, status),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
