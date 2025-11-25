/**
 * useWorkArea Hook
 * Fetches professional work area data with React Query
 */

import { useQuery } from '@tanstack/react-query';

export interface WorkAreaData {
  work_address: string;
  work_postal_code: string | null;
  work_city: string | null;
  work_latitude: number;
  work_longitude: number;
  service_radius_km: number;
}

export interface WorkAreaResponse {
  saved: boolean;
  data: WorkAreaData | null;
}

async function getWorkArea(): Promise<WorkAreaResponse> {
  const response = await fetch('/api/registration/work-area');

  if (!response.ok) {
    throw new Error('Failed to fetch work area');
  }

  return response.json();
}

export const workAreaKeys = {
  all: ['workArea'] as const,
  detail: () => [...workAreaKeys.all, 'detail'] as const,
};

export function useWorkArea() {
  return useQuery<WorkAreaResponse>({
    queryKey: workAreaKeys.detail(),
    queryFn: getWorkArea,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
