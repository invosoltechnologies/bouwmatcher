import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/company-search
 * Search for companies by name or KVK number
 *
 * TODO: Integrate with real KVK API (https://developers.kvk.nl/)
 * For now, this is a mock implementation
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Mock data - Replace with actual KVK API integration
    const mockCompanies = [
      {
        name: 'Big Gym Amsterdam Noord',
        kvkNumber: '70933479',
        address: 'Klaproosweg 75',
        city: 'Amsterdam',
        postalCode: '1033 NN',
        houseNumber: '75',
        street: 'Klaproosweg',
      },
      {
        name: 'Big Gym Amsterdam Zuid',
        kvkNumber: '70933480',
        address: 'Amstelveenseweg 500',
        city: 'Amsterdam',
        postalCode: '1081 KL',
        houseNumber: '500',
        street: 'Amstelveenseweg',
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
    });

    /*
    // Example: Real KVK API integration (requires API key)
    const KVK_API_KEY = process.env.KVK_API_KEY;
    const KVK_API_URL = 'https://api.kvk.nl/api/v1/zoeken';

    const response = await fetch(
      `${KVK_API_URL}?naam=${encodeURIComponent(query)}`,
      {
        headers: {
          'apikey': KVK_API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('KVK API error');
    }

    const data = await response.json();

    // Transform KVK response to our format
    const companies = data.resultaten.map((result: any) => ({
      name: result.handelsnaam,
      kvkNumber: result.kvkNummer,
      address: result.adres.straatnaam + ' ' + result.adres.huisnummer,
      city: result.adres.plaats,
      postalCode: result.adres.postcode,
      houseNumber: result.adres.huisnummer,
      street: result.adres.straatnaam,
    }));

    return NextResponse.json({
      companies,
      query,
    });
    */
  } catch (error) {
    console.error('Company search error:', error);
    return NextResponse.json(
      { error: 'Failed to search companies' },
      { status: 500 }
    );
  }
}
