import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { searchParams } = new URL(request.url);
    const servicePageId = searchParams.get('servicePageId');

    if (!servicePageId) {
      return NextResponse.json(
        { error: 'servicePageId is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('service_page_reviews')
      .select('*')
      .eq('service_page_id', servicePageId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return NextResponse.json(data || null);
  } catch (error) {
    console.error('Error fetching Reviews section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Reviews section' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const body = await request.json();
    const {
      service_page_id,
      heading_nl,
      heading_en,
      description_nl,
      description_en,
      eye_text_nl,
      eye_text_en,
    } = body;

    // Validate required fields
    if (
      !service_page_id ||
      !heading_nl ||
      !heading_en ||
      !eye_text_nl ||
      !eye_text_en
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Reviews already exists
    const { data: existingReviews } = await supabase
      .from('service_page_reviews')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    let result;

    if (existingReviews) {
      // Update existing
      const { data, error } = await supabase
        .from('service_page_reviews')
        .update({
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          eye_text_nl,
          eye_text_en,
          updated_at: new Date().toISOString(),
        })
        .eq('service_page_id', service_page_id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new
      const { data, error } = await supabase
        .from('service_page_reviews')
        .insert({
          service_page_id,
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          eye_text_nl,
          eye_text_en,
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      message: 'Reviews section saved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error saving Reviews section:', error);
    return NextResponse.json(
      { error: 'Failed to save Reviews section' },
      { status: 500 }
    );
  }
}
