import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const service_page_id = searchParams.get('service_page_id');

    if (!service_page_id) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('service_page_overview_tables')
      .select('*')
      .eq('service_page_id', service_page_id)
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows found
      return NextResponse.json(null);
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch overview table section' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      service_page_id,
      heading_nl,
      heading_en,
      description_nl,
      description_en,
      content_nl,
      content_en,
    } = body;

    // Check if record exists
    const { data: existingSection } = await supabase
      .from('service_page_overview_tables')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    if (existingSection) {
      // Update existing
      const { data, error } = await supabase
        .from('service_page_overview_tables')
        .update({
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          content_nl,
          content_en,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSection.id)
        .select()
        .single();

      if (error) {
        console.error('Update error:', error);
        return NextResponse.json(
          { error: 'Failed to update overview table section' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Overview table section updated successfully',
        overviewTable: data,
      });
    } else {
      // Create new
      const { data, error } = await supabase
        .from('service_page_overview_tables')
        .insert({
          service_page_id,
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          content_nl,
          content_en,
        })
        .select()
        .single();

      if (error) {
        console.error('Insert error:', error);
        return NextResponse.json(
          { error: 'Failed to create overview table section' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message: 'Overview table section created successfully',
          overviewTable: data,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
