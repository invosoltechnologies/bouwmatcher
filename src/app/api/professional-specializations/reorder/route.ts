import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// PUT - Bulk update priorities after reordering
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get professional profile
    const { data: profile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { order } = body; // Array of { id, priority }

    if (!Array.isArray(order) || order.length === 0) {
      return NextResponse.json(
        { error: 'order array is required' },
        { status: 400 }
      );
    }

    // Update priorities in a transaction-like manner
    const updates = order.map((item) =>
      supabase
        .from('professional_specializations')
        .update({ priority: item.priority, updated_at: new Date().toISOString() })
        .eq('id', item.id)
        .eq('professional_id', profile.id)
    );

    const results = await Promise.all(updates);

    // Check for errors
    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      console.error('Error updating priorities:', errors);
      return NextResponse.json(
        { error: 'Failed to update some priorities' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PUT /api/professional-specializations/reorder:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
