import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/admin/professionals/[id]/unblock
 *
 * Unblocks a professional by:
 * - Setting is_verified to 'unverified'
 * - Setting is_active to true (user can log in again)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Professional ID is required' },
        { status: 400 }
      );
    }

    // Update professional profile to unverified and set is_active to true
    // Admin can verify them separately if needed
    const { data, error } = await supabase
      .from('professional_profiles')
      .update({
        is_verified: 'unverified',
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error unblocking professional:', error);
      return NextResponse.json(
        { error: 'Failed to unblock professional' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Professional not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Professional unblocked successfully',
        professional: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/admin/professionals/[id]/unblock:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
