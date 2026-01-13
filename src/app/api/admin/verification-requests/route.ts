import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export interface VerificationRequest {
  id: string;
  professional_id: string;
  company_id: string | null;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  notes: string | null;
  created_at: string;
}

/**
 * POST /api/admin/verification-requests
 *
 * Creates a new verification request for a professional/company
 *
 * Body:
 * - professional_id: string (required)
 * - company_id: string (optional)
 * - notes: string (optional) - Additional notes for admin
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { professional_id, company_id, notes } = body;

    if (!professional_id) {
      return NextResponse.json(
        { error: 'professional_id is required' },
        { status: 400 }
      );
    }

    // Verify that the requesting user is the professional
    const { data: profile, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, user_id')
      .eq('id', professional_id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Professional not found' },
        { status: 404 }
      );
    }

    if (profile.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Cannot request verification for another professional' },
        { status: 403 }
      );
    }

    // Check if a verification request already exists
    const { data: existingRequest } = await supabase
      .from('professional_verification_requests')
      .select('id, status')
      .eq('professional_id', professional_id)
      .eq('status', 'pending')
      .single();

    if (existingRequest) {
      return NextResponse.json(
        {
          error: 'A verification request is already pending',
          requestId: existingRequest.id,
        },
        { status: 409 }
      );
    }

    // Create the verification request
    const { data: verificationRequest, error: createError } = await supabase
      .from('professional_verification_requests')
      .insert({
        professional_id,
        company_id: company_id || null,
        status: 'pending',
        notes: notes || null,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating verification request:', createError);
      return NextResponse.json(
        { error: 'Failed to create verification request' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admins about new verification request
    // await emailService.sendAdminNotification(verificationRequest);

    return NextResponse.json(verificationRequest, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/verification-requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/verification-requests
 *
 * Fetches verification requests (admin only)
 *
 * Query parameters:
 * - status: Filter by status (pending, approved, rejected)
 * - limit: Results per page
 * - offset: Pagination offset
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify admin access
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

    // TODO: Add admin role check
    // For now, just allow any authenticated user (should be restricted to admins)

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('professional_verification_requests')
      .select(
        `
        *,
        professional_profiles:professional_id (
          id,
          first_name,
          last_name,
          email
        ),
        professional_companies:company_id (
          id,
          company_name
        )
        `,
        { count: 'exact' }
      );

    if (status) {
      query = query.eq('status', status);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching verification requests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch verification requests' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        requests: data,
        total: count || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/admin/verification-requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
