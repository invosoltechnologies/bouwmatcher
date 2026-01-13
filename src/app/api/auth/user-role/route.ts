import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/utils/admin-auth';

export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user role
    const role = await getUserRole(user.id);

    return NextResponse.json({
      role,
      userId: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error('Error getting user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
