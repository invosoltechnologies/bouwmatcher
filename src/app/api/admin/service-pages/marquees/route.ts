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

    // Get marquee data
    const { data: marquee, error } = await supabase
      .from('service_page_marquees')
      .select('*')
      .eq('service_page_id', servicePageId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!marquee) {
      return NextResponse.json(null);
    }

    // Get marquee items
    const { data: items, error: itemsError } = await supabase
      .from('service_page_marquee_items')
      .select('*')
      .eq('marquee_id', marquee.id)
      .order('display_order', { ascending: true });

    if (itemsError) {
      throw itemsError;
    }

    return NextResponse.json({
      ...marquee,
      items: items || [],
    });
  } catch (error) {
    console.error('Error fetching marquees section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marquees section' },
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
      is_enabled,
      after_sections,
      items,
    } = body;

    // Validate required fields
    if (!service_page_id) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    // Validate item count (3-6)
    if (!items || items.length < 3 || items.length > 6) {
      return NextResponse.json(
        { error: 'Marquee must have between 3 and 6 items' },
        { status: 400 }
      );
    }

    // Validate each item
    for (const item of items) {
      if (!item.text_nl || !item.text_en) {
        return NextResponse.json(
          { error: 'All items must have NL and EN text' },
          { status: 400 }
        );
      }
    }

    // Check if marquee already exists
    const { data: existingMarquee } = await supabase
      .from('service_page_marquees')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    let marqueeId: string;

    if (existingMarquee) {
      // Update existing marquee
      const { data: updatedMarquee, error: updateError } = await supabase
        .from('service_page_marquees')
        .update({
          is_enabled,
          after_sections,
          updated_at: new Date().toISOString(),
        })
        .eq('service_page_id', service_page_id)
        .select()
        .single();

      if (updateError) throw updateError;
      marqueeId = updatedMarquee.id;

      // Delete existing items
      await supabase
        .from('service_page_marquee_items')
        .delete()
        .eq('marquee_id', marqueeId);
    } else {
      // Create new marquee
      const { data: newMarquee, error: createError } = await supabase
        .from('service_page_marquees')
        .insert({
          service_page_id,
          is_enabled,
          after_sections,
        })
        .select()
        .single();

      if (createError) throw createError;
      marqueeId = newMarquee.id;
    }

    // Insert items
    const itemsToInsert = items.map((item: any, index: number) => ({
      marquee_id: marqueeId,
      text_nl: item.text_nl,
      text_en: item.text_en,
      display_order: index,
    }));

    const { error: itemsError } = await supabase
      .from('service_page_marquee_items')
      .insert(itemsToInsert);

    if (itemsError) throw itemsError;

    // Fetch complete marquee with items
    const { data: completeMarquee } = await supabase
      .from('service_page_marquees')
      .select(
        `
        *,
        service_page_marquee_items(*)
      `
      )
      .eq('id', marqueeId)
      .single();

    return NextResponse.json({
      message: 'Marquee section saved successfully',
      data: {
        ...completeMarquee,
        items: completeMarquee.service_page_marquee_items || [],
      },
    });
  } catch (error) {
    console.error('Error saving marquees section:', error);
    return NextResponse.json(
      { error: 'Failed to save marquees section' },
      { status: 500 }
    );
  }
}
