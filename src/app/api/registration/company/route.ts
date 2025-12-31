import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      companyName,
      kvkNumber,
      postalCode,
      houseNumber,
      street,
      city,
      country,
      businessIdType,
      businessIdFormatted,
      // Optional fields from API
      vatNumber,
      phone,
      email,
      website,
      employees,
      description,
    } = body;

    if (!companyName || !kvkNumber || !postalCode || !houseNumber || !street || !city || !country || !businessIdType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if company already exists by business_id and country
    const { data: existingCompany } = await supabase
      .from('professional_companies')
      .select('id')
      .eq('business_id', kvkNumber)
      .eq('country', country)
      .single();

    let companyId: string;

    if (existingCompany) {
      // Company exists - use existing company_id
      companyId = existingCompany.id;
      console.log('Company already exists, linking to existing company:', companyId);
    } else {
      // Company doesn't exist - create new one
      const { data: newCompany, error: companyError } = await supabase
        .from('professional_companies')
        .insert({
          company_name: companyName,
          business_id: kvkNumber,
          business_id_type: businessIdType,
          business_id_formatted: businessIdFormatted || kvkNumber,
          country: country,
          postal_code: postalCode,
          house_number: houseNumber,
          street_name: street,
          city: city,
          full_address: `${street} ${houseNumber}, ${postalCode} ${city}`,
          // Additional fields from API
          vat_number: vatNumber,
          business_phone: phone,
          business_email: email,
          website: website,
          employee_count: employees ? String(employees) : null,
          business_description: description,
          // Standard fields
          created_by: user.id,
          is_active: true,
          verification_status: 'pending',
        })
        .select('id')
        .single();

      if (companyError || !newCompany) {
        console.error('Error creating company:', companyError);
        return NextResponse.json(
          { error: 'Failed to create company' },
          { status: 500 }
        );
      }

      companyId = newCompany.id;
      console.log('New company created:', companyId);
    }

    // Link user to company via company_id in professional_profiles
    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update({
        company_id: companyId,
        role_in_company: 'owner',
        is_verified: 'verified',
        joined_company_at: new Date().toISOString(),
        profile_completed: true,
        current_step: 6,
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to link company to profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      company_id: companyId,
    });
  } catch (error) {
    console.error('Error in company registration API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
