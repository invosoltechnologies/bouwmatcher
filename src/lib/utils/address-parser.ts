/**
 * Address Parser Utility
 * Extracts country, postal code, and city from Google Places API responses
 * with regex fallback for address strings
 */

export interface AddressComponents {
  country: string | null;
  postalCode: string | null;
  city: string | null;
}

export interface GoogleAddressComponent {
  types: string[];
  long_name: string;
  short_name: string;
}

/**
 * Parse Google Places API address_components to extract location details
 * This is the preferred method as it's more reliable than regex parsing
 *
 * @param addressComponents - Array of address components from Google Places API
 * @returns Object containing country code, postal code, and city
 */
export function parseAddressComponents(
  addressComponents: GoogleAddressComponent[]
): AddressComponents {
  let country: string | null = null;
  let postalCode: string | null = null;
  let city: string | null = null;

  addressComponents.forEach((component) => {
    // Extract country code (ISO 3166-1 alpha-2)
    if (component.types.includes('country')) {
      country = component.short_name; // e.g., "NL" or "BE"
    }

    // Extract postal code
    if (component.types.includes('postal_code')) {
      postalCode = component.long_name;
    }

    // Extract city (locality)
    if (component.types.includes('locality')) {
      city = component.long_name;
    }

    // Fallback: Try administrative_area_level_2 if locality not found
    if (!city && component.types.includes('administrative_area_level_2')) {
      city = component.long_name;
    }
  });

  return { country, postalCode, city };
}

/**
 * Parse address string using regex patterns (fallback method)
 * Supports both Dutch and Belgian postal code formats
 *
 * @param address - Formatted address string
 * @returns Object containing country (null in fallback), postal code, and city
 */
export function parseAddressString(address: string): AddressComponents {
  let postalCode: string | null = null;
  let city: string | null = null;

  // Try Dutch postal code pattern first: 4 digits followed by 2 letters (e.g., "1234 AB")
  const dutchPostalCodeMatch = address.match(/\b\d{4}\s?[A-Z]{2}\b/i);

  if (dutchPostalCodeMatch) {
    postalCode = dutchPostalCodeMatch[0].toUpperCase();

    // Extract city - typically after postal code, before country
    const parts = address.split(postalCode);
    if (parts[1]) {
      const afterPostal = parts[1].trim().split(',')[0].trim();
      city = afterPostal || null;
    }
  } else {
    // Try Belgian postal code pattern: 4 digits only (e.g., "1000")
    const belgianPostalCodeMatch = address.match(/\b\d{4}\b/);

    if (belgianPostalCodeMatch) {
      postalCode = belgianPostalCodeMatch[0];

      // Extract city - typically after postal code, before country
      const parts = address.split(postalCode);
      if (parts[1]) {
        const afterPostal = parts[1].trim().split(',')[0].trim();
        city = afterPostal || null;
      }
    }
  }

  // Try to extract city from comma-separated parts if not found yet
  if (!city) {
    const parts = address.split(',').map(part => part.trim());
    // City is usually in the second or third part
    if (parts.length >= 2) {
      city = parts[parts.length - 2] || null;
    }
  }

  // Cannot reliably determine country from string alone
  return { country: null, postalCode, city };
}

/**
 * Extract location details with hybrid approach:
 * Try Google Places address_components first, fallback to regex parsing
 *
 * @param address - Formatted address string
 * @param addressComponents - Optional Google Places address_components array
 * @returns Object containing country code, postal code, and city
 */
export function extractLocationDetails(
  address: string,
  addressComponents?: GoogleAddressComponent[]
): AddressComponents {
  // Try Google Places API components first (preferred method)
  if (addressComponents && addressComponents.length > 0) {
    const result = parseAddressComponents(addressComponents);

    // If we got all required fields, return immediately
    if (result.country && result.postalCode && result.city) {
      return result;
    }

    // If we got partial data, try to fill in missing fields with regex
    const fallbackResult = parseAddressString(address);

    return {
      country: result.country || fallbackResult.country,
      postalCode: result.postalCode || fallbackResult.postalCode,
      city: result.city || fallbackResult.city,
    };
  }

  // Fallback to regex parsing if no address_components provided
  return parseAddressString(address);
}
