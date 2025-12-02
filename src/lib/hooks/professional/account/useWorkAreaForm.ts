/**
 * useWorkAreaForm Hook
 * React Hook Form integration for work area data
 */

import { useForm, UseFormReturn } from 'react-hook-form';
import type { WorkAreaFormData } from '@/types/map';
import type { WorkAreaData } from './useWorkArea';

interface UseWorkAreaFormOptions {
  defaultValues?: Partial<WorkAreaFormData>;
}

/**
 * Initialize work area form with React Hook Form
 *
 * @param options - Form options including default values
 * @returns React Hook Form instance
 */
export function useWorkAreaForm(
  options?: UseWorkAreaFormOptions
): UseFormReturn<WorkAreaFormData> {
  const form = useForm<WorkAreaFormData>({
    defaultValues: {
      location: options?.defaultValues?.location || '',
      latitude: options?.defaultValues?.latitude || null,
      longitude: options?.defaultValues?.longitude || null,
      serviceRadius: options?.defaultValues?.serviceRadius || 10,
      postalCode: options?.defaultValues?.postalCode || null,
      city: options?.defaultValues?.city || null,
      country: options?.defaultValues?.country || null,
    },
    mode: 'onChange',
  });

  return form;
}

/**
 * Convert WorkAreaData (from API) to WorkAreaFormData (for form)
 */
export function workAreaDataToFormData(data: WorkAreaData | null): Partial<WorkAreaFormData> {
  if (!data) return {};

  return {
    location: data.work_address,
    latitude: data.work_latitude,
    longitude: data.work_longitude,
    serviceRadius: data.service_radius_km,
    postalCode: data.work_postal_code,
    city: data.work_city,
    country: data.work_country,
  };
}

/**
 * Convert WorkAreaFormData (from form) to API payload
 */
export function formDataToWorkAreaPayload(data: WorkAreaFormData) {
  return {
    work_address: data.location,
    work_postal_code: data.postalCode,
    work_city: data.city,
    work_country: data.country,
    work_latitude: data.latitude!,
    work_longitude: data.longitude!,
    service_radius_km: data.serviceRadius,
  };
}
