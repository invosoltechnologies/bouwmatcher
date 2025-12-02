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
    const { description } = body;

    // Validate required fields
    if (description === undefined || description === null) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length > 360) {
      return NextResponse.json(
        { error: 'Description must be 360 characters or less' },
        { status: 400 }
      );
    }

    // Get the user's professional profile to find company_id and role
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('company_id, role_in_company')
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

    // Check if user is owner
    if (profileData.role_in_company !== 'owner') {
      return NextResponse.json(
        { error: 'Only company owners can update the description' },
        { status: 403 }
      );
    }

    // Update company description
    const { data: updatedCompany, error: updateError } = await supabase
      .from('professional_companies')
      .update({
        business_description: description.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileData.company_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating company description:', updateError);
      return NextResponse.json(
        { error: 'Failed to update company description' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      company: updatedCompany
    });
  } catch (error) {
    console.error('Error in company description update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
