import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/professionals/by-email?email={email}
 * Find professional by their quotes_email field
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Search for professional by quotes_email
    const { data: professional, error } = await supabase
      .from('professional_profiles')
      .select(`
        id,
        user_id,
        first_name,
        last_name,
        email,
        quotes_email,
        company_id,
        is_verified
      `)
      .eq('quotes_email', email.toLowerCase())
      .single();

    if (error || !professional) {
      console.error('Professional lookup error:', {
        email,
        supabaseError: error,
        professional,
      });
      return NextResponse.json(
        { error: 'Professional not found', details: error?.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      professional: {
        id: professional.id,
        first_name: professional.first_name,
        last_name: professional.last_name,
        quotes_email: professional.quotes_email,
      },
    });
  } catch (error) {
    console.error('Error finding professional:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
