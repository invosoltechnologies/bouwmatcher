/**
 * useUpdateWorkArea Hook
 * Mutation hook for updating work area data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workAreaKeys } from './useWorkArea';
import toast from 'react-hot-toast';

export interface UpdateWorkAreaPayload {
  work_address: string;
  work_postal_code: string | null;
  work_city: string | null;
  work_country: string | null;
  work_latitude: number;
  work_longitude: number;
  service_radius_km: number;
}

async function updateWorkArea(payload: UpdateWorkAreaPayload) {
  const response = await fetch('/api/registration/work-area', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update work area');
  }

  return response.json();
}

export function useUpdateWorkArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkArea,
    onSuccess: () => {
      // Invalidate and refetch work area data
      queryClient.invalidateQueries({ queryKey: workAreaKeys.all });
      toast.success('Werkgebied succesvol bijgewerkt');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Fout bij het bijwerken van werkgebied');
    },
  });
}
