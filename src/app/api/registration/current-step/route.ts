import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
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

    const { data: profiles } = await supabase
      .from('professional_profiles')
      .select('current_step, profile_completed')
      .eq('user_id', user.id)
      .limit(1);

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const profile = profiles[0];

    return NextResponse.json({
      current_step: profile.current_step || 1,
      profile_completed: profile.profile_completed || false,
    });
  } catch (error) {
    console.error('Error in current-step API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
