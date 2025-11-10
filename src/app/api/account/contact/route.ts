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
    const { contactPerson, quotesEmail, invoicesEmail, generalEmail, phoneNumber } = body;

    // Validate required fields
    if (!contactPerson || !quotesEmail || !invoicesEmail || !generalEmail || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quotesEmail) || !emailRegex.test(invoicesEmail) || !emailRegex.test(generalEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Update professional profile contact information
    const { data: updatedProfile, error: updateError } = await supabase
      .from('professional_profiles')
      .update({
        contact_person: contactPerson,
        quotes_email: quotesEmail,
        invoices_email: invoicesEmail,
        general_email: generalEmail,
        phone_number: phoneNumber,
        updated_at: new Date().toISOString(),
      })
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
