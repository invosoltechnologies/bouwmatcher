import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * PATCH /api/admin/service-categories/[id]/root-question
 * Update root question for a category
 */
export async function PATCH(request: NextRequest, props: RouteParams) {
  try {
    const { id } = await props.params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const body = await request.json();
    const { question_text_nl, question_text_en } = body;

    // Validate required fields
    if (!question_text_nl || !question_text_en) {
      return NextResponse.json(
        { error: 'Both question_text_nl and question_text_en are required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('id')
      .eq('id', categoryId)
      .single();

    if (categoryError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Find the root question for this category
    const { data: rootQuestion, error: findError } = await supabase
      .from('project_form_questions')
      .select('id')
      .eq('service_category_id', categoryId)
      .eq('is_root_question', true)
      .is('parent_question_id', null)
      .single();

    if (findError || !rootQuestion) {
      console.error('Error finding root question:', findError);
      return NextResponse.json({ error: 'Root question not found' }, { status: 404 });
    }

    // Update the root question
    const { error: updateError } = await supabase
      .from('project_form_questions')
      .update({
        question_text_nl,
        question_text_en,
        updated_at: new Date().toISOString(),
      })
      .eq('id', rootQuestion.id);

    if (updateError) {
      console.error('Error updating root question:', updateError);
      return NextResponse.json(
        { error: 'Failed to update root question' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH /api/admin/service-categories/[id]/root-question:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
