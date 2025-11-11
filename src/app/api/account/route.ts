import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import type {
  ProfessionalProfile,
  Company,
} from '@/lib/types/account';
import { transformAccountData } from '@/lib/utils/account-data';

export async function GET() {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Unauthorized', details: authError?.message },
        { status: 401 }
      );
    }

    console.log('Fetching profile for user:', user.id);

    // Fetch professional profile data
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      return NextResponse.json(
        {
          error: 'Failed to fetch professional profile',
          details: profileError.message,
          code: profileError.code
        },
        { status: 404 }
      );
    }

    if (!profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    console.log('Profile found, fetching company:', profileData.company_id);

    // Fetch company data (may not exist yet)
    let companyData = null;

    if (profileData.company_id) {
      const { data, error: companyError } = await supabase
        .from('professional_companies')
        .select('*')
        .eq('id', profileData.company_id)
        .maybeSingle();

      if (companyError) {
        console.error('Company error:', companyError);
        // Don't return error, just log it - company might not exist yet
      } else {
        companyData = data;
      }
    }

    console.log('Company data:', companyData ? 'Found' : 'Not found, using defaults');

    // Transform database data to frontend format
    const accountData = transformAccountData({
      profile: profileData as ProfessionalProfile,
      company: companyData as Company,
    });

    return NextResponse.json({ accountData });
  } catch (error) {
    console.error('Error in account API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
