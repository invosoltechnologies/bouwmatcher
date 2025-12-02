/**
 * useSaveWorkArea Hook
 * React Query mutation for saving work area during registration
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workAreaKeys } from './useWorkArea';
import toast from 'react-hot-toast';
import type { WorkAreaFormData } from '@/types/map';

interface SaveWorkAreaPayload {
  work_address: string;
  work_postal_code: string | null;
  work_city: string | null;
  work_country: string | null;
  work_latitude: number;
  work_longitude: number;
  service_radius_km: number;
}

async function saveWorkArea(payload: SaveWorkAreaPayload) {
  const response = await fetch('/api/registration/work-area', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Kon werkgebied niet opslaan');
  }

  return response.json();
}

/**
 * Hook for saving work area data during registration
 *
 * @returns React Query mutation for saving work area
 */
export function useSaveWorkArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveWorkArea,
    onSuccess: () => {
      // Invalidate and refetch work area data
      queryClient.invalidateQueries({ queryKey: workAreaKeys.all });
      toast.success('Werkgebied opgeslagen!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Er is een fout opgetreden bij het opslaan');
    },
  });
}

/**
 * Helper to convert WorkAreaFormData to API payload
 */
export function prepareWorkAreaPayload(data: WorkAreaFormData): SaveWorkAreaPayload {
  if (!data.latitude || !data.longitude) {
    throw new Error('Latitude and longitude are required');
  }

  return {
    work_address: data.location,
    work_postal_code: data.postalCode,
    work_city: data.city,
    work_country: data.country,
    work_latitude: data.latitude,
    work_longitude: data.longitude,
    service_radius_km: data.serviceRadius,
  };
}
