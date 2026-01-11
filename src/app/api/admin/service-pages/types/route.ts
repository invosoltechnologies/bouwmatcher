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
      .from('service_page_types')
      .select('*')
      .eq('service_page_id', servicePageId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return NextResponse.json(data || null);
  } catch (error) {
    console.error('Error fetching Types section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Types section' },
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
    } = body;

    // Validate required fields
    if (!service_page_id || !heading_nl || !heading_en) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Types already exists
    const { data: existingTypes } = await supabase
      .from('service_page_types')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    let result;

    if (existingTypes) {
      // Update existing
      const { data, error } = await supabase
        .from('service_page_types')
        .update({
          heading_nl,
          heading_en,
          description_nl,
          description_en,
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
        .from('service_page_types')
        .insert({
          service_page_id,
          heading_nl,
          heading_en,
          description_nl,
          description_en,
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      message: 'Types section saved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error saving Types section:', error);
    return NextResponse.json(
      { error: 'Failed to save Types section' },
      { status: 500 }
    );
  }
}
