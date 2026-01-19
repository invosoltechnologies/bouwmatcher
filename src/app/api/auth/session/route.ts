import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { session: null, error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { session: null, error: 'Failed to check session' },
      { status: 500 }
    );
  }
}
