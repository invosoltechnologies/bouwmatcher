import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CategoryFullDataResponse } from '@/types/admin/category-form';

/**
 * GET /api/admin/service-categories/[id]/full
 * Fetches complete category data including subcategories, questions, and options
 * Used for edit mode
 */
export async function GET(
  _request: NextRequest,
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

    // Fetch category
    const { data: category, error: categoryError } = await supabase
      .from('service_categories')
      .select('*')
      .eq('id', categoryId)
      .eq('is_deleted', false)
      .single();

    if (categoryError || !category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Fetch subcategories
    const { data: subcategories, error: subcategoriesError } = await supabase
      .from('service_subcategories')
      .select('*')
      .eq('service_category_id', categoryId)
      .order('sort_order', { ascending: true });

    if (subcategoriesError) {
      console.error('Error fetching subcategories:', subcategoriesError);
      return NextResponse.json(
        { error: 'Failed to fetch subcategories' },
        { status: 500 }
      );
    }

    // Fetch root question for category
    const { data: rootQuestion, error: rootError } = await supabase
      .from('project_form_questions')
      .select('*')
      .eq('service_category_id', categoryId)
      .eq('is_root_question', true)
      .single();

    // It's okay if root question doesn't exist (PGRST116)
    if (rootError && rootError.code !== 'PGRST116') {
      console.error('Error fetching root question:', rootError);
    }

    // Fetch questions for all subcategories
    const subcategoryIds = subcategories?.map(sub => sub.id) || [];
    const { data: questions, error: questionsError } = await supabase
      .from('project_form_questions')
      .select('*')
      .in('service_subcategory_id', subcategoryIds)
      .order('order_index', { ascending: true });

    if (questionsError) {
      console.error('Error fetching questions:', questionsError);
      return NextResponse.json(
        { error: 'Failed to fetch questions' },
        { status: 500 }
      );
    }

    // Fetch options for all questions
    const questionIds = questions?.map(q => q.id) || [];
    const { data: options, error: optionsError } = await supabase
      .from('project_form_question_options')
      .select('*')
      .in('question_id', questionIds)
      .order('order_index', { ascending: true });

    if (optionsError) {
      console.error('Error fetching options:', optionsError);
      return NextResponse.json(
        { error: 'Failed to fetch question options' },
        { status: 500 }
      );
    }

    // Build hierarchical structure
    const subcategoriesWithQuestions = (subcategories || []).map(subcategory => {
      const subcategoryQuestions = (questions || [])
        .filter(q => q.service_subcategory_id === subcategory.id)
        .map(question => ({
          ...question,
          options: (options || []).filter(opt => opt.question_id === question.id),
        }));

      return {
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
        questions: subcategoryQuestions,
      };
    });

    const response: CategoryFullDataResponse = {
      category: {
        id: category.id,
        name_nl: category.name_nl,
        name_en: category.name_en,
        slug: category.slug,
        icon_url: category.icon_url,
        created_at: category.created_at,
      },
      subcategories: subcategoriesWithQuestions,
      rootQuestion: rootQuestion || null,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in GET /api/admin/service-categories/[categoryId]/full:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
