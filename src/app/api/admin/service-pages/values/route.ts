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

    // Get values section
    const { data: valuesData, error: valuesError } = await supabase
      .from('service_page_values')
      .select('*')
      .eq('service_page_id', service_page_id)
      .single();

    if (valuesError && valuesError.code === 'PGRST116') {
      // No rows found
      return NextResponse.json(null);
    }

    if (valuesError) {
      console.error('Supabase error:', valuesError);
      return NextResponse.json(
        { error: 'Failed to fetch values section' },
        { status: 500 }
      );
    }

    // Get value items
    const { data: itemsData, error: itemsError } = await supabase
      .from('service_page_value_items')
      .select('*')
      .eq('values_id', valuesData.id)
      .order('position', { ascending: true });

    if (itemsError) {
      console.error('Supabase error:', itemsError);
      return NextResponse.json(
        { error: 'Failed to fetch value items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...valuesData,
      items: itemsData || [],
    });
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
      center_text_nl,
      center_text_en,
      items,
    } = body;

    // Validate that we have exactly 4 items with correct positions
    const positions = ['top_left', 'top_right', 'bottom_left', 'bottom_right'];
    if (!Array.isArray(items) || items.length !== 4) {
      return NextResponse.json(
        { error: 'Must have exactly 4 value items' },
        { status: 400 }
      );
    }

    const itemPositions = items.map((item: any) => item.position).sort();
    const expectedPositions = [...positions].sort();
    if (JSON.stringify(itemPositions) !== JSON.stringify(expectedPositions)) {
      return NextResponse.json(
        { error: 'Invalid item positions. Must include all: top_left, top_right, bottom_left, bottom_right' },
        { status: 400 }
      );
    }

    // Check if values section exists
    const { data: existingValues } = await supabase
      .from('service_page_values')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    let valuesId: string;

    if (existingValues) {
      // Update existing values section
      const { error: updateError } = await supabase
        .from('service_page_values')
        .update({
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          center_text_nl,
          center_text_en,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingValues.id);

      if (updateError) {
        console.error('Update error:', updateError);
        return NextResponse.json(
          { error: 'Failed to update values section' },
          { status: 500 }
        );
      }

      valuesId = existingValues.id;

      // Delete existing items
      await supabase
        .from('service_page_value_items')
        .delete()
        .eq('values_id', valuesId);
    } else {
      // Create new values section
      const { data: newValues, error: insertError } = await supabase
        .from('service_page_values')
        .insert({
          service_page_id,
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          center_text_nl,
          center_text_en,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to create values section' },
          { status: 500 }
        );
      }

      valuesId = newValues.id;
    }

    // Insert new items
    const itemsToInsert = items.map((item: any) => ({
      values_id: valuesId,
      position: item.position,
      heading_nl: item.heading_nl,
      heading_en: item.heading_en,
      description_nl: item.description_nl,
      description_en: item.description_en,
      icon_url: item.icon_url || null,
      icon_alt_text: item.icon_alt_text || null,
    }));

    const { data: insertedItems, error: itemsInsertError } = await supabase
      .from('service_page_value_items')
      .insert(itemsToInsert)
      .select();

    if (itemsInsertError) {
      console.error('Items insert error:', itemsInsertError);
      return NextResponse.json(
        { error: 'Failed to save value items' },
        { status: 500 }
      );
    }

    // Get updated values
    const { data: updatedValues, error: fetchError } = await supabase
      .from('service_page_values')
      .select('*')
      .eq('id', valuesId)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch updated values' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: existingValues
          ? 'Values section updated successfully'
          : 'Values section created successfully',
        values: {
          ...updatedValues,
          items: insertedItems,
        },
      },
      { status: existingValues ? 200 : 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
