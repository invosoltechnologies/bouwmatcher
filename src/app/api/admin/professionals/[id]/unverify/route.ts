import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/admin/professionals/[id]/unverify
 *
 * Unverifies a professional by:
 * - Setting is_verified to 'unverified'
 * - Keeps is_active as true (user can still log in)
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

    // Update professional profile to unverified and ensure is_active is true
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
      console.error('Error unverifying professional:', error);
      return NextResponse.json(
        { error: 'Failed to unverify professional' },
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
        message: 'Professional unverified successfully',
        professional: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/admin/professionals/[id]/unverify:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
