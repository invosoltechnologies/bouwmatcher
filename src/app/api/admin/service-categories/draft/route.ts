import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateCategoryDraftDTO, CategoryDraftResponse } from '@/types/admin/category-form';

/**
 * POST /api/admin/service-categories/draft
 * Creates a new category draft (Step 1 of multi-step form)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body: CreateCategoryDraftDTO = await request.json();
    const { name_nl, name_en, slug, root_question_text_nl, root_question_text_en } = body;

    // Validate required fields
    if (!name_nl || !name_en || !slug || !root_question_text_nl || !root_question_text_en) {
      return NextResponse.json(
        { error: 'Missing required fields: name_nl, name_en, slug, root_question_text_nl, root_question_text_en' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existingCategory, error: checkError } = await supabase
      .from('service_categories')
      .select('id')
      .eq('slug', slug)
      .eq('is_deleted', false)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (slug doesn't exist, which is what we want)
      console.error('Error checking slug:', checkError);
      return NextResponse.json(
        { error: 'Failed to validate slug' },
        { status: 500 }
      );
    }

    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 409 }
      );
    }

    // Create category
    const { data: category, error: insertError } = await supabase
      .from('service_categories')
      .insert({
        name_nl,
        name_en,
        slug,
        is_active: true,
        is_deleted: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating category:', insertError);
      return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
      );
    }

    // Create root question for this category using admin-provided text
    const rootQuestionId = `q-${slug}-root`;
    const { error: rootQuestionError } = await supabase
      .from('project_form_questions')
      .insert({
        id: rootQuestionId,
        service_category_id: category.id,
        service_subcategory_id: null,
        question_text_nl: root_question_text_nl,
        question_text_en: root_question_text_en,
        question_type: 'radio',
        is_root_question: true,
        parent_question_id: null,
        parent_option_id: null,
        order_index: 1,
        is_required: true,
        is_active: true,
        step_number: 1,
      });

    if (rootQuestionError) {
      console.error('Error creating root question:', rootQuestionError);
      // Don't fail the entire request if root question creation fails
      // We can retry this later when subcategories are added
    }

    const response: CategoryDraftResponse = {
      id: category.id,
      name_nl: category.name_nl,
      name_en: category.name_en,
      slug: category.slug,
      icon_url: category.icon_url,
      created_at: category.created_at,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/admin/service-categories/draft:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
