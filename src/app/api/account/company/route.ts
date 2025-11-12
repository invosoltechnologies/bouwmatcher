import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
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

    // Get the request body
    const body = await request.json();
    const { companyName, address, postalCode, city, website, businessId } = body;

    // Validate required fields
    if (!companyName || !address || !postalCode || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the user's professional profile to find company_id
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('company_id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    if (!profileData.company_id) {
      return NextResponse.json(
        { error: 'No company linked to this profile' },
        { status: 404 }
      );
    }

    // Update company information
    const { data: updatedCompany, error: updateError } = await supabase
      .from('professional_companies')
      .update({
        company_name: companyName,
        full_address: address,
        postal_code: postalCode,
        city,
        website: website || null,
        business_id: businessId || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileData.company_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating company:', updateError);
      return NextResponse.json(
        { error: 'Failed to update company information' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      company: updatedCompany
    });
  } catch (error) {
    console.error('Error in company update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
