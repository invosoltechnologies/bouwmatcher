import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { serviceCategorySlug, postcode, executionTiming } = body;

    // Validate required fields
    if (!serviceCategorySlug) {
      return NextResponse.json(
        { error: 'Service category is required' },
        { status: 400 }
      );
    }

    // Lookup service category ID by slug
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('id')
      .eq('slug', serviceCategorySlug)
      .single();

    if (categoryError || !category) {
      console.error('Error finding service category:', categoryError);
      return NextResponse.json(
        { error: 'Service category not found' },
        { status: 404 }
      );
    }

    // Generate unique session token
    const sessionToken = randomUUID();

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert project draft
    const { data: draft, error } = await supabase
      .from('project_drafts')
      .insert({
        service_category_id: category.id,
        session_token: sessionToken,
        ip_address: ipAddress,
        user_agent: userAgent,
        postcode: postcode || null,
        execution_timing: executionTiming || null,
        current_step: 1,
      })
      .select('id, session_token')
      .single();

    if (error) {
      console.error('Error creating project draft:', error);
      return NextResponse.json(
        { error: 'Failed to create project draft' },
        { status: 500 }
      );
    }

    // Return draft ID and session token
    return NextResponse.json({
      success: true,
      draftId: draft.id,
      sessionToken: draft.session_token,
    });

  } catch (error) {
    console.error('Error in initialize draft:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
