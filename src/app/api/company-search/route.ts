import { NextRequest, NextResponse } from 'next/server';
import { KBO_CONFIG } from '@/lib/config';

/**
 * GET /api/company-search
 * Search for companies by name or KVK/KBO number
 * Supports both Dutch (KVK) and Belgian (KBO) companies
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const country = searchParams.get('country') as 'NL' | 'BE' | null;

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        { error: 'Country parameter is required (NL or BE)' },
        { status: 400 }
      );
    }

    // Route to appropriate API based on country
    if (country === 'BE') {
      return await searchBelgianCompanies(query);
    } else {
      return await searchDutchCompanies(query);
    }
  } catch (error) {
    console.error('Company search error:', error);
    return NextResponse.json(
      { error: 'Failed to search companies' },
      { status: 500 }
    );
  }
}

/**
 * Search Belgian companies using KBO API
 */
async function searchBelgianCompanies(query: string) {
  const apiKey = KBO_CONFIG.apiKey;
  const apiUrl = KBO_CONFIG.apiUrl;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'KBO API key not configured' },
      { status: 500 }
    );
  }

  // Debug logging (remove in production)
  console.log('KBO API URL:', apiUrl);
  console.log('KBO API Key exists:', !!apiKey);
  console.log('KBO API Key length:', apiKey?.length);
  console.log('KBO API Key (first 10 chars):', apiKey?.substring(0, 10));

  try {
    // Search by company name using denominations endpoint
    const url = `${apiUrl}/denominations?query=${encodeURIComponent(query)}&entityType=enterprise&language=nl&limit=20`;
    console.log('Requesting URL:', url);

    const searchResponse = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', searchResponse.status);
    console.log('Response headers:', Object.fromEntries(searchResponse.headers.entries()));

    if (!searchResponse.ok) {
      // Log the error response for debugging
      const errorText = await searchResponse.text();
      console.error(`KBO API error ${searchResponse.status}:`, errorText);

      if (searchResponse.status === 402) {
        throw new Error('KBO API plan upgrade required');
      }
      if (searchResponse.status === 404) {
        // No results found
        return NextResponse.json({
          companies: [],
          query,
          country: 'BE',
        });
      }
      if (searchResponse.status === 406) {
        throw new Error(`KBO API error 406: Not Acceptable - ${errorText}`);
      }
      throw new Error(`KBO API error: ${searchResponse.status} - ${errorText}`);
    }

    const searchData = await searchResponse.json();

    // Fetch full details for each company (including address)
    const companies = await Promise.all(
      (searchData.data || []).slice(0, 10).map(async (result: { entityNumber: string; value: string; entityNumberFormatted?: string }) => {
        try {
          // Get address for this enterprise
          const addressResponse = await fetch(
            `${apiUrl}/enterprise/${result.entityNumber}/address`,
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
              },
            }
          );

          let addressData: { data?: Array<{ type?: string; street?: string; houseNumber?: string; postalCode?: string; city?: string; municipality?: string; zipCode?: string }> } = {};
          if (addressResponse.ok) {
            addressData = await addressResponse.json();
          }

          // Find the main address
          const mainAddress = addressData.data?.find(
            (addr) => addr.type === 'main' || addr.type === 'registered'
          ) || addressData.data?.[0];

          return {
            name: result.value,
            kvkNumber: result.entityNumber,
            businessIdFormatted: result.entityNumberFormatted,
            address: mainAddress
              ? `${mainAddress.street || ''} ${mainAddress.houseNumber || ''}`.trim()
              : '',
            city: mainAddress?.municipality || '',
            postalCode: mainAddress?.zipCode || '',
            houseNumber: mainAddress?.houseNumber || '',
            street: mainAddress?.street || '',
            country: 'BE' as const,
            businessIdType: 'KBO' as const,
          };
        } catch (error) {
          // If address fetch fails, return company with basic info
          console.error(`Failed to fetch address for ${result.entityNumber}:`, error);
          return {
            name: result.value,
            kvkNumber: result.entityNumber,
            businessIdFormatted: result.entityNumberFormatted,
            address: '',
            city: '',
            postalCode: '',
            houseNumber: '',
            street: '',
            country: 'BE' as const,
            businessIdType: 'KBO' as const,
          };
        }
      })
    );

    return NextResponse.json({
      companies,
      query,
      country: 'BE',
    });
  } catch (error) {
    console.error('Belgian KBO search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Belgian companies' },
      { status: 500 }
    );
  }
}

/**
 * Search Dutch companies (mock for now, can integrate KVK API later)
 */
async function searchDutchCompanies(query: string) {
  // Mock data - Replace with actual KVK API integration when available
  const mockCompanies = [
    {
      name: 'Big Gym Amsterdam Noord',
      kvkNumber: '70933479',
      businessIdFormatted: '70933479',
      address: 'Klaproosweg 75',
      city: 'Amsterdam',
      postalCode: '1033 NN',
      houseNumber: '75',
      street: 'Klaproosweg',
      country: 'NL' as const,
      businessIdType: 'KVK' as const,
    },
    {
      name: 'Big Gym Amsterdam Zuid',
      kvkNumber: '70933480',
      businessIdFormatted: '70933480',
      address: 'Amstelveenseweg 500',
      city: 'Amsterdam',
      postalCode: '1081 KL',
      houseNumber: '500',
      street: 'Amstelveenseweg',
      country: 'NL' as const,
      businessIdType: 'KVK' as const,
    },
  ];

  // Simple search filter
  const searchLower = query.toLowerCase();
  const results = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchLower) ||
      company.kvkNumber.includes(query)
  );

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    companies: results,
    query,
    country: 'NL',
  });
}
