/**
 * Shared TypeScript types for map components
 */

import type { GoogleAddressComponent } from '@/lib/utils/address-parser';

/**
 * Place selection data from Google Places API
 */
export interface PlaceSelection {
  address: string;
  lat: number;
  lng: number;
  addressComponents?: GoogleAddressComponent[];
}

/**
 * Service radius option for selection
 */
export interface RadiusOption {
  value: number;
  label: string;
}

/**
 * Work area form data structure
 * Used by React Hook Form
 */
export interface WorkAreaFormData {
  location: string;
  latitude: number | null;
  longitude: number | null;
  serviceRadius: number;
  postalCode: string | null;
  city: string | null;
  country: string | null;
}

/**
 * Coordinates interface
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Map type options
 */
export type MapType = 'roadmap' | 'satellite' | 'terrain';

/**
 * Default radius options
 */
export const DEFAULT_RADIUS_OPTIONS: RadiusOption[] = [
  { value: 10, label: '10 km' },
  { value: 20, label: '20 km' },
  { value: 30, label: '30 km' },
  { value: 50, label: '+50 km' },
];

/**
 * Default map center (Netherlands - Amsterdam)
 */
export const DEFAULT_MAP_CENTER: Coordinates = {
  lat: 52.3676,
  lng: 4.9041,
};

// Re-export GoogleAddressComponent for convenience
export type { GoogleAddressComponent };
