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

    const { data: banner, error } = await supabase
      .from('service_page_banners')
      .select('*')
      .eq('service_page_id', servicePageId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is acceptable
      console.error('Error fetching banner:', error);
      return NextResponse.json(
        { error: 'Failed to fetch banner' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      banner: banner || null,
    });
  } catch (error) {
    console.error('Error in service page banners GET route:', error);
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
      eyebrow_text_nl,
      eyebrow_text_en,
      h1_text_nl,
      h1_text_en,
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

    // Check if banner already exists
    const { data: existingBanner } = await supabase
      .from('service_page_banners')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    if (existingBanner) {
      // Update existing banner
      const { data: updatedBanner, error } = await supabase
        .from('service_page_banners')
        .update({
          eyebrow_text_nl,
          eyebrow_text_en,
          h1_text_nl,
          h1_text_en,
          description_nl,
          description_en,
          background_image_url,
          updated_at: new Date().toISOString(),
        })
        .eq('service_page_id', service_page_id)
        .select()
        .single();

      if (error) {
        console.error('Error updating banner:', error);
        return NextResponse.json(
          { error: 'Failed to update banner' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Banner updated successfully',
        banner: updatedBanner,
      });
    }

    // Create new banner
    const { data: newBanner, error } = await supabase
      .from('service_page_banners')
      .insert({
        service_page_id,
        eyebrow_text_nl,
        eyebrow_text_en,
        h1_text_nl,
        h1_text_en,
        description_nl,
        description_en,
        background_image_url,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating banner:', error);
      return NextResponse.json(
        { error: 'Failed to create banner' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Banner created successfully',
        banner: newBanner,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in service page banners POST route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
