import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateSubcategoryDTO, SubcategoryResponse } from '@/types/admin/category-form';

/**
 * POST /api/admin/service-categories/[id]/subcategories
 * Creates a new subcategory with questions and options
 * Creates an option for the root question using this subcategory's data
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: categoryId } = await params;

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body: CreateSubcategoryDTO = await request.json();
    const {
      name_nl,
      name_en,
      slug,
      description_nl,
      description_en,
      price_particulier,
      price_zakelijk,
      sort_order,
      questions,
    } = body;

    // Validate required fields
    if (!name_nl || !name_en || !slug || price_particulier === undefined || price_zakelijk === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if category exists
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('id, name_nl, name_en, slug')
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .single();

    if (categoryError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Check if subcategory slug already exists
    const { data: existingSubcategory, error: checkError } = await supabase
      .from('service_subcategories')
      .select('id')
      .eq('slug', slug)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking slug:', checkError);
      return NextResponse.json(
        { error: 'Failed to validate slug' },
        { status: 500 }
      );
    }

    if (existingSubcategory) {
      return NextResponse.json(
        { error: 'A subcategory with this slug already exists' },
        { status: 409 }
      );
    }

    // Create subcategory
    const { data: subcategory, error: insertError } = await supabase
      .from('service_subcategories')
      .insert({
        name_nl,
        name_en,
        slug,
        description_nl: description_nl || null,
        description_en: description_en || null,
        price_particulier,
        price_zakelijk,
        sort_order: sort_order || 0,
        service_category_id: parseInt(categoryId),
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating subcategory:', insertError);
      return NextResponse.json(
        { error: 'Failed to create subcategory' },
        { status: 500 }
      );
    }

    // Get root question for this category (should already exist from Step 1)
    const rootQuestionId = `q-${category.slug}-root`;
    const { data: rootQuestion, error: rootCheckError } = await supabase
      .from('project_form_questions')
      .select('id')
      .eq('id', rootQuestionId)
      .eq('service_category_id', categoryId)
      .eq('is_root_question', true)
      .single();

    if (rootCheckError || !rootQuestion) {
      console.error('Root question not found for category:', categoryId);
      return NextResponse.json(
        { error: 'Root question not found. Category may not be properly initialized.' },
        { status: 500 }
      );
    }

    // Create option for root question using this subcategory
    // The subcategory becomes an option in the root question
    const rootOptionId = `opt-${category.slug}-root-${subcategory.id}`;
    const { error: rootOptionError } = await supabase
      .from('project_form_question_options')
      .insert({
        id: rootOptionId,
        question_id: rootQuestionId,
        option_value: slug,
        option_label_nl: name_nl,
        option_label_en: name_en,
        has_follow_up: false,
        order_index: sort_order || 0,
        is_active: true,
      });

    if (rootOptionError) {
      console.error('Error creating root question option:', rootOptionError);
      // Don't fail the entire request, just log the error
    }

    // Create questions and options for this subcategory
    if (questions && questions.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionId = `q-${slug}-${i + 1}`;

        // Insert question
        const { error: questionError } = await supabase
          .from('project_form_questions')
          .insert({
            id: questionId,
            service_category_id: parseInt(categoryId),
            service_subcategory_id: subcategory.id,
            question_text_nl: question.question_text_nl,
            question_text_en: question.question_text_en,
            question_type: question.question_type,
            is_root_question: false,
            parent_question_id: `q-${category.slug}-root`,
            parent_option_id: null,
            order_index: question.order_index,
            is_required: question.is_required,
            placeholder_nl: question.placeholder_nl || null,
            placeholder_en: question.placeholder_en || null,
            help_text_nl: question.help_text_nl || null,
            help_text_en: question.help_text_en || null,
            is_active: true,
            step_number: question.step_number,
          });

        if (questionError) {
          console.error(`Error creating question ${questionId}:`, questionError);
          continue;
        }

        // Insert options for this question
        if (question.options && question.options.length > 0) {
          const optionsToInsert = question.options.map((option, optIndex) => ({
            id: `opt-${slug}-${i + 1}-${optIndex + 1}`,
            question_id: questionId,
            option_value: option.option_value,
            option_label_nl: option.option_label_nl,
            option_label_en: option.option_label_en,
            has_follow_up: false,
            order_index: option.order_index,
            is_active: true,
          }));

          const { error: optionsError } = await supabase
            .from('project_form_question_options')
            .insert(optionsToInsert);

          if (optionsError) {
            console.error(`Error creating options for question ${questionId}:`, optionsError);
          }
        }
      }
    }

    const response: SubcategoryResponse = {
      id: subcategory.id,
      name_nl: subcategory.name_nl,
      name_en: subcategory.name_en,
      slug: subcategory.slug,
      description_nl: subcategory.description_nl,
      description_en: subcategory.description_en,
      price_particulier: parseFloat(subcategory.price_particulier),
      price_zakelijk: parseFloat(subcategory.price_zakelijk),
      icon_url: subcategory.icon_url,
      sort_order: subcategory.sort_order,
      service_category_id: subcategory.service_category_id,
      created_at: subcategory.created_at,
      updated_at: subcategory.updated_at,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/admin/service-categories/[categoryId]/subcategories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
