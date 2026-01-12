import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET: Fetch all FAQ items for a FAQ section
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const faqId = searchParams.get('faq_id');

    if (!faqId) {
      return NextResponse.json(
        { error: 'faq_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('service_page_faq_items')
      .select('*')
      .eq('service_page_faq_id', faqId)
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new FAQ item
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      service_page_faq_id,
      question_nl,
      question_en,
      answer_nl,
      answer_en,
    } = body;

    if (!service_page_faq_id || !question_nl || !question_en || !answer_nl || !answer_en) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Get current max display_order
    const { data: maxOrderData } = await supabase
      .from('service_page_faq_items')
      .select('display_order')
      .eq('service_page_faq_id', service_page_faq_id)
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = maxOrderData ? maxOrderData.display_order + 1 : 0;

    const { data: newItem, error } = await supabase
      .from('service_page_faq_items')
      .insert({
        service_page_faq_id,
        question_nl,
        question_en,
        answer_nl,
        answer_en,
        display_order: nextOrder,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'FAQ item created successfully',
      item: newItem,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
