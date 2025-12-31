/**
 * Geocoding utility for converting addresses to coordinates
 * Used for project location matching with professional work areas
 */

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}

export interface AddressComponents {
  postcode: string;
  city: string;
  streetName?: string;
  streetNumber?: string;
}

/**
 * Geocodes an address to latitude/longitude coordinates
 * Uses Google Maps Geocoding API
 *
 * @param address - Address components from the project form
 * @returns Coordinates or null if geocoding fails
 */
export async function geocodeAddress(
  address: AddressComponents
): Promise<GeocodeResult | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('[Geocode] Google Maps API key is missing');
    return null;
  }

  try {
    // Build address string from components
    // Format: "Street Number, Postcode City, Country"
    // Belgium and Netherlands format
    const addressParts: string[] = [];

    if (address.streetName) {
      addressParts.push(
        address.streetNumber
          ? `${address.streetName} ${address.streetNumber}`
          : address.streetName
      );
    }

    if (address.postcode && address.city) {
      addressParts.push(`${address.postcode} ${address.city}`);
    }

    // Add country bias for Belgium/Netherlands
    addressParts.push('Belgium OR Netherlands');

    const addressString = addressParts.join(', ');

    console.log('[Geocode] Geocoding address:', addressString);

    // Call Google Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      addressString
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;

      console.log('[Geocode] Successfully geocoded:', {
        lat: location.lat,
        lng: location.lng,
        formatted: result.formatted_address,
      });

      return {
        latitude: location.lat,
        longitude: location.lng,
        formattedAddress: result.formatted_address,
      };
    } else {
      console.error('[Geocode] Geocoding failed:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('[Geocode] Error during geocoding:', error);
    return null;
  }
}

/**
 * Validates if coordinates are within Belgium or Netherlands bounds
 * Belgium: ~49.5°N to 51.5°N, 2.5°E to 6.4°E
 * Netherlands: ~50.7°N to 53.6°N, 3.3°E to 7.2°E
 */
export function isValidBelgiumNetherlandsCoordinates(
  latitude: number,
  longitude: number
): boolean {
  const isLatValid = latitude >= 49.0 && latitude <= 54.0;
  const isLngValid = longitude >= 2.0 && longitude <= 8.0;

  return isLatValid && isLngValid;
}
