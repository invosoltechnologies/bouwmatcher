import { NextRequest, NextResponse } from 'next/server';
import { KBO_CONFIG, BEDRIJFSDATA_CONFIG } from '@/lib/config';

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
    // Check if query looks like an enterprise number (10 digits)
    const cleanQuery = query.replace(/\D/g, '');
    const isEnterpriseNumber = /^\d{10}$/.test(cleanQuery);

    let url: string;

    if (isEnterpriseNumber) {
      // Search by enterprise number directly using the enterprise endpoint
      url = `${apiUrl}/enterprise/${cleanQuery}`;
      console.log('Searching by enterprise number:', cleanQuery);
    } else {
      // Search by company name using denominations endpoint with filters
      url = `${apiUrl}/denominations?query=${encodeURIComponent(query)}&entityType=enterprise&type=commercial&active=active&language=nl&limit=20`;
      console.log('Searching by company name:', query);
    }

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
    console.log('Search data:', JSON.stringify(searchData, null, 2));

    // Normalize response: enterprise endpoint returns single object, denominations returns array
    let results: Array<{ entityNumber: string; value: string; entityNumberFormatted?: string }> = [];

    if (isEnterpriseNumber) {
      // Single enterprise result - data is nested under "Enterprise" key
      const enterprise = searchData.Enterprise;
      if (enterprise && enterprise.enterpriseNumber) {
        // Get denomination from typeDescription
        const denomination = enterprise.typeDescription?.nl ||
                           enterprise.JuridicalForm?.description?.nl ||
                           'Bedrijf';

        results = [{
          entityNumber: enterprise.enterpriseNumber,
          value: denomination,
          entityNumberFormatted: enterprise.enterpriseNumberFormatted
        }];
      }
    } else {
      // Denominations search results - KBO API returns data under "Denominations" array
      const denominations = searchData.Denominations || [];
      const mappedResults = denominations.map((item: { Denomination: { entityNumber: string; value: string; entityNumberFormatted?: string; type?: string } }) => ({
        entityNumber: item.Denomination.entityNumber,
        value: item.Denomination.value,
        entityNumberFormatted: item.Denomination.entityNumberFormatted,
        type: item.Denomination.type
      }));

      // Deduplicate by entityNumber and prefer social/commercial names over abbreviations
      const uniqueCompanies = new Map<string, typeof mappedResults[0]>();
      for (const result of mappedResults) {
        const existing = uniqueCompanies.get(result.entityNumber);
        if (!existing ||
            (result.type === 'social' && existing.type !== 'social') ||
            (result.type === 'commercial' && existing.type === 'abbreviation')) {
          uniqueCompanies.set(result.entityNumber, result);
        }
      }
      results = Array.from(uniqueCompanies.values());
    }

    // Fetch full details for each company (including address)
    console.log(`Fetching addresses for ${results.length} companies...`);
    const companies = await Promise.all(
      results.slice(0, 10).map(async (result: { entityNumber: string; value: string; entityNumberFormatted?: string }) => {
        try {
          // Get address for this enterprise
          const addressUrl = `${apiUrl}/enterprise/${result.entityNumber}/address`;
          console.log(`Fetching address for ${result.entityNumber} (${result.value}):`, addressUrl);

          const addressResponse = await fetch(
            addressUrl,
            {
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
              },
            }
          );

          console.log(`Address response status for ${result.entityNumber}:`, addressResponse.status);

          let addressData: {
            Address?: {
              type?: string;
              street?: { nl?: string; fr?: string };
              addressNumber?: string;
              addressAdditional?: string;
              postOfficeBox?: string;
              zipcode?: string;
              city?: { nl?: string; fr?: string };
              country?: { nl?: string; fr?: string };
            }
          } = {};

          if (addressResponse.ok) {
            addressData = await addressResponse.json();
            console.log(`Address data for ${result.entityNumber}:`, JSON.stringify(addressData, null, 2));
          } else {
            const errorText = await addressResponse.text();
            console.error(`Failed to fetch address for ${result.entityNumber}:`, addressResponse.status, errorText);
          }

          // KBO API returns a single Address object (not an array)
          const address = addressData.Address;
          console.log(`Address object for ${result.entityNumber}:`, address);

          const street = address?.street?.nl || address?.street?.fr || '';
          const addressNumber = address?.addressNumber || '';
          const box = address?.postOfficeBox ? ` bus ${address.postOfficeBox}` : '';
          const fullAddress = address
            ? `${street} ${addressNumber}${box}`.trim()
            : '';

          return {
            name: result.value,
            kvkNumber: result.entityNumber,
            businessIdFormatted: result.entityNumberFormatted,
            address: fullAddress,
            city: address?.city?.nl || address?.city?.fr || '',
            postalCode: address?.zipcode || '',
            houseNumber: addressNumber,
            street: street,
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

    console.log(`Returning ${companies.length} companies with full details`);
    console.log('Final companies data:', JSON.stringify(companies, null, 2));

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
 * Search Dutch companies using Bedrijfsdata.nl API
 */
async function searchDutchCompanies(query: string) {
  const apiKey = BEDRIJFSDATA_CONFIG.apiKey;
  const apiUrl = BEDRIJFSDATA_CONFIG.apiUrl;
  const apiVersion = 'v1.2';

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Bedrijfsdata API key not configured' },
      { status: 500 }
    );
  }

  // Debug logging
  console.log('Bedrijfsdata API URL:', apiUrl);
  console.log('API Key exists:', !!apiKey);
  console.log('Searching Dutch companies with query:', query);

  try {
    // Check if query looks like a COC/KVK number (8 digits)
    const cleanQuery = query.replace(/\D/g, '');
    const isCocNumber = /^\d{8}$/.test(cleanQuery);

    // Build the URL with query parameters
    // API expects: {{base_url}}/{{api_version}}/companies?name=Koninklijke&api_key={{api_key}}
    // OR: {{base_url}}/{{api_version}}/companies?coc=06023267&api_key={{api_key}}
    const searchParams = new URLSearchParams({
      country: 'nl',
      api_key: apiKey,
    });

    if (isCocNumber) {
      // Search by COC number
      searchParams.append('coc', cleanQuery);
      console.log('Searching by COC number:', cleanQuery);
    } else {
      // Search by company name
      searchParams.append('name', query);
      console.log('Searching by company name:', query);
    }

    const url = `${apiUrl}/${apiVersion}/companies?${searchParams.toString()}`;
    console.log('Requesting URL (without API key):', url.replace(apiKey, '***'));

    const searchResponse = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', searchResponse.status);

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error(`Bedrijfsdata API error ${searchResponse.status}:`, errorText);

      if (searchResponse.status === 404) {
        // No results found
        return NextResponse.json({
          companies: [],
          query,
          country: 'NL',
        });
      }

      throw new Error(`Bedrijfsdata API error: ${searchResponse.status} - ${errorText}`);
    }

    const searchData = await searchResponse.json();
    console.log('Search data:', JSON.stringify(searchData, null, 2));

    // Paid API response format based on provided example:
    // {
    //   status: "ok",
    //   found: 1,
    //   companies: [{
    //     name: string,
    //     coc: string,
    //     address: string,
    //     postcode: string,
    //     city: string,
    //     country_code: string,
    //     vat: string,
    //     phone: string,
    //     email: string,
    //     domain: string,
    //     employees: number,
    //     ... (many other fields)
    //   }]
    // }

    if (searchData.status !== 'ok' || !searchData.companies) {
      return NextResponse.json({
        companies: [],
        query,
        country: 'NL',
      });
    }

    const companiesArray = searchData.companies;

    if (!Array.isArray(companiesArray) || companiesArray.length === 0) {
      return NextResponse.json({
        companies: [],
        query,
        country: 'NL',
      });
    }

    // Transform results to match our CompanySearchResponse interface
    const companies = companiesArray.map((result: {
      name: string;
      coc: string;
      address: string;
      postcode: string;
      city: string;
      vat?: string;
      phone?: string;
      email?: string;
      domain?: string;
      employees?: number;
      description?: string;
      description_en?: string[];
    }) => {
      // Parse address to extract street and house number
      // Address format: "Brouwerslaan 1"
      const addressParts = result.address ? result.address.trim().split(/\s+/) : [];
      let street = '';
      let houseNumber = '';

      if (addressParts.length > 0) {
        // Last part is usually the house number
        const lastPart = addressParts[addressParts.length - 1];
        if (/\d/.test(lastPart)) {
          houseNumber = lastPart;
          street = addressParts.slice(0, -1).join(' ');
        } else {
          // No house number found, entire address is street
          street = result.address;
        }
      }

      return {
        name: result.name,
        kvkNumber: result.coc,
        businessIdFormatted: result.coc,
        address: result.address || '',
        city: result.city || '',
        postalCode: result.postcode || '',
        houseNumber: houseNumber,
        street: street,
        country: 'NL' as const,
        businessIdType: 'KVK' as const,
        // Additional fields that can be stored in company profile
        vatNumber: result.vat,
        phone: result.phone,
        email: result.email,
        website: result.domain,
        employees: result.employees,
        description: result.description || (result.description_en ? result.description_en[0] : undefined),
      };
    });

    console.log(`Returning ${companies.length} Dutch companies`);
    console.log('Final companies data:', JSON.stringify(companies, null, 2));

    return NextResponse.json({
      companies,
      query,
      country: 'NL',
      found: searchData.found || companies.length,
      creditsUsed: searchData.credits_used || 0,
    });
  } catch (error) {
    console.error('Dutch COC/KVK search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Dutch companies' },
      { status: 500 }
    );
  }
}
