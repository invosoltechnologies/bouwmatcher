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
    const { firstName, lastName, quotesEmail, invoicesEmail, phoneNumber, gender } = body;

    // Validate required fields (only name and phone are required)
    if (!firstName || !lastName || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format if provided (emails are optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (quotesEmail && !emailRegex.test(quotesEmail)) {
      return NextResponse.json(
        { error: 'Invalid quotes email format' },
        { status: 400 }
      );
    }
    if (invoicesEmail && !emailRegex.test(invoicesEmail)) {
      return NextResponse.json(
        { error: 'Invalid invoices email format' },
        { status: 400 }
      );
    }

    // Validate gender if provided
    if (gender && !['male', 'female', 'other', 'prefer_not_to_say'].includes(gender)) {
      return NextResponse.json(
        { error: 'Invalid gender value' },
        { status: 400 }
      );
    }

    // Update professional profile contact information
    const updateData: any = {
      first_name: firstName,
      last_name: lastName,
      quotes_email: quotesEmail || null,
      invoices_email: invoicesEmail || null,
      phone: phoneNumber,
      updated_at: new Date().toISOString(),
    };

    // Add gender only if provided (optional field)
    if (gender) {
      updateData.gender = gender;
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('professional_profiles')
      .update(updateData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating contact info:', updateError);
      return NextResponse.json(
        { error: 'Failed to update contact information' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Error in contact update API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
