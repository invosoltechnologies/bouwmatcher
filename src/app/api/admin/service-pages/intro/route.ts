import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const servicePageId = searchParams.get('service_page_id');

    if (!servicePageId) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    const { data: intro, error } = await supabase
      .from('service_pages_intro')
      .select('*')
      .eq('service_page_id', servicePageId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching intro:', error);
      return NextResponse.json(
        { error: 'Failed to fetch intro' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      intro: intro || null,
    });
  } catch (error) {
    console.error('Error in service page intro GET route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      service_page_id,
      heading_nl,
      heading_en,
      description_nl,
      description_en,
      background_image_url,
    } = body;

    if (!service_page_id) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    // Check if intro already exists
    const { data: existingIntro } = await supabase
      .from('service_pages_intro')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    if (existingIntro) {
      // Update existing intro
      const { data: updatedIntro, error } = await supabase
        .from('service_pages_intro')
        .update({
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          background_image_url,
          updated_at: new Date().toISOString(),
        })
        .eq('service_page_id', service_page_id)
        .select()
        .single();

      if (error) {
        console.error('Error updating intro:', error);
        return NextResponse.json(
          { error: 'Failed to update intro' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Intro updated successfully',
        intro: updatedIntro,
      });
    }

    // Create new intro
    const { data: newIntro, error } = await supabase
      .from('service_pages_intro')
      .insert({
        service_page_id,
        heading_nl,
        heading_en,
        description_nl,
        description_en,
        background_image_url,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating intro:', error);
      return NextResponse.json(
        { error: 'Failed to create intro' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Intro created successfully',
        intro: newIntro,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in service page intro POST route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
