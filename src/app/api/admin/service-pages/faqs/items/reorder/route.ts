import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// PATCH: Reorder FAQ items
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { faq_id, item_ids } = body;

    if (!faq_id || !Array.isArray(item_ids)) {
      return NextResponse.json(
        { error: 'faq_id and item_ids array are required' },
        { status: 400 }
      );
    }

    // Update display_order for each item
    const updates = item_ids.map((itemId, index) => {
      return supabase
        .from('service_page_faq_items')
        .update({ display_order: index })
        .eq('id', itemId)
        .eq('service_page_faq_id', faq_id);
    });

    await Promise.all(updates);

    return NextResponse.json({
      message: 'FAQ items reordered successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
