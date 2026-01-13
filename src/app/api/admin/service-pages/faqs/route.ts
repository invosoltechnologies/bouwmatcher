import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET: Fetch FAQ section by service_page_id
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const servicePageId = searchParams.get('service_page_id');

    if (!servicePageId) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('service_page_faqs')
      .select('*')
      .eq('service_page_id', servicePageId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create or update FAQ section
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
    } = body;

    if (!service_page_id) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    // Check if FAQ section already exists
    const { data: existingFaq } = await supabase
      .from('service_page_faqs')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    if (existingFaq) {
      // Update existing FAQ section
      const { data: updatedFaq, error } = await supabase
        .from('service_page_faqs')
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

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: 'FAQ section updated successfully',
        faq: updatedFaq,
      });
    } else {
      // Create new FAQ section
      const { data: newFaq, error } = await supabase
        .from('service_page_faqs')
        .insert({
          service_page_id,
          heading_nl,
          heading_en,
          description_nl,
          description_en,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: 'FAQ section created successfully',
        faq: newFaq,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
