import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/admin/professionals/[id]/block
 *
 * Blocks a professional by:
 * - Setting is_verified to 'suspended'
 * - Setting is_active to false (user cannot log in)
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

    // Update professional profile to suspended and set is_active to false
    const { data, error } = await supabase
      .from('professional_profiles')
      .update({
        is_verified: 'suspended',
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error blocking professional:', error);
      return NextResponse.json(
        { error: 'Failed to block professional' },
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
        message: 'Professional blocked successfully',
        professional: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/admin/professionals/[id]/block:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
